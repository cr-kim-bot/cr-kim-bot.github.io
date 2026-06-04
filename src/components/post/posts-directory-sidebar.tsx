"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileText,
  FolderTree,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { PostNavigationItem } from "@/entities/post/model/posts";
import { cn } from "@/lib/utils";

type PostsDirectorySidebarProps = {
  activeRouteSegments: string[];
  items: PostNavigationItem[];
};

const sidebarOpenStateStorageKey = "posts-directory-sidebar-open-state";

function hasActiveRoute(
  item: PostNavigationItem,
  activeRouteSegments: string[],
) {
  if (item.type === "post") {
    return item.routeSegments.join("/") === activeRouteSegments.join("/");
  }

  return item.routeSegments.every(
    (segment, index) => activeRouteSegments[index] === segment,
  );
}

function isExactActiveRoute(
  item: PostNavigationItem,
  activeRouteSegments: string[],
) {
  return item.routeSegments.join("/") === activeRouteSegments.join("/");
}

function hasChildSection(item: PostNavigationItem) {
  return item.items.some((child) => child.type === "section");
}

function getDefaultOpenState(
  items: PostNavigationItem[],
  activeRouteSegments: string[],
): Record<string, boolean> {
  const state: Record<string, boolean> = {};

  for (const item of items) {
    if (item.type === "section" && item.items.length > 0) {
      state[item.routePath] =
        hasChildSection(item) || hasActiveRoute(item, activeRouteSegments);
    }

    Object.assign(state, getDefaultOpenState(item.items, activeRouteSegments));
  }

  return state;
}

function getActiveOpenState(
  items: PostNavigationItem[],
  activeRouteSegments: string[],
): Record<string, boolean> {
  const state: Record<string, boolean> = {};

  for (const item of items) {
    if (
      item.type === "section" &&
      item.items.length > 0 &&
      hasActiveRoute(item, activeRouteSegments)
    ) {
      state[item.routePath] = true;
    }

    Object.assign(state, getActiveOpenState(item.items, activeRouteSegments));
  }

  return state;
}

function findActiveItem(
  items: PostNavigationItem[],
  activeRouteSegments: string[],
): PostNavigationItem | undefined {
  for (const item of items) {
    if (isExactActiveRoute(item, activeRouteSegments)) {
      return item;
    }

    const activeChild = findActiveItem(item.items, activeRouteSegments);

    if (activeChild) {
      return activeChild;
    }
  }

  return undefined;
}

function NavigationItem({
  activeRouteSegments,
  item,
  level,
  onNavigate,
  onOpenChange,
  openState,
}: {
  activeRouteSegments: string[];
  item: PostNavigationItem;
  level: number;
  onNavigate?: () => void;
  onOpenChange: (routePath: string, isOpen: boolean) => void;
  openState: Record<string, boolean>;
}) {
  const isActive = hasActiveRoute(item, activeRouteSegments);
  const isExactActive = isExactActiveRoute(item, activeRouteSegments);
  const hasChildren = item.items.length > 0;

  if (item.type === "section" && hasChildren) {
    return (
      <li>
        <Collapsible
          onOpenChange={(isOpen) => onOpenChange(item.routePath, isOpen)}
          open={openState[item.routePath]}
        >
          <div className="flex items-center gap-1">
            <CollapsibleTrigger asChild>
              <Button
                aria-label={`${item.title} 하위 항목 접기/펼치기`}
                className="size-7 shrink-0 aria-expanded:bg-transparent data-[state=open]:[&_svg]:rotate-90"
                size="icon-sm"
                style={{ marginLeft: `${level * 0.875}rem` }}
                type="button"
                variant="ghost"
              >
                <ChevronRight
                  aria-hidden="true"
                  className="transition-transform"
                  size={15}
                />
              </Button>
            </CollapsibleTrigger>
            <Link
              aria-current={isExactActive ? "page" : undefined}
              className={cn(
                "flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-dim text-sm leading-5 transition-colors hover:bg-surface-subtle hover:text-foreground",
                isActive && "font-medium text-foreground",
                isExactActive && "bg-surface-subtle",
              )}
              href={item.routePath}
              onClick={onNavigate}
            >
              <FolderTree aria-hidden="true" className="shrink-0" size={15} />
              <span className="truncate">{item.title}</span>
            </Link>
          </div>
          <CollapsibleContent>
            <ul className="mt-0.5">
              {item.items.map((child) => (
                <NavigationItem
                  activeRouteSegments={activeRouteSegments}
                  item={child}
                  key={child.routePath}
                  level={level + 1}
                  onNavigate={onNavigate}
                  onOpenChange={onOpenChange}
                  openState={openState}
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  const Icon = item.type === "section" ? FolderTree : FileText;

  return (
    <li>
      <Link
        aria-current={isExactActive ? "page" : undefined}
        className={cn(
          "flex min-h-8 items-center gap-2 rounded-md px-2 py-1.5 text-dim text-sm leading-5 transition-colors hover:bg-surface-subtle hover:text-foreground",
          isActive && "bg-surface-subtle font-medium text-foreground",
        )}
        href={item.routePath}
        onClick={onNavigate}
        style={{ paddingLeft: `${0.5 + level * 0.875}rem` }}
      >
        <Icon aria-hidden="true" className="shrink-0" size={15} />
        <span className="truncate">{item.title}</span>
      </Link>
      {hasChildren ? (
        <ul className="mt-0.5">
          {item.items.map((child) => (
            <NavigationItem
              activeRouteSegments={activeRouteSegments}
              item={child}
              key={child.routePath}
              level={level + 1}
              onNavigate={onNavigate}
              onOpenChange={onOpenChange}
              openState={openState}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function PostsDirectorySidebar({
  activeRouteSegments,
  items,
}: PostsDirectorySidebarProps) {
  const isArchiveActive = activeRouteSegments.length === 0;
  const defaultOpenState = useMemo(
    () => getDefaultOpenState(items, activeRouteSegments),
    [activeRouteSegments, items],
  );
  const activeOpenState = useMemo(
    () => getActiveOpenState(items, activeRouteSegments),
    [activeRouteSegments, items],
  );
  const [userOpenState, setUserOpenState] = useState<Record<string, boolean>>(
    {},
  );
  const [isMobileDirectoryOpen, setIsMobileDirectoryOpen] = useState(false);
  const hasLoadedUserState = useRef(false);
  const activeItem = isArchiveActive
    ? undefined
    : findActiveItem(items, activeRouteSegments);
  const ActiveIcon = activeItem?.type === "post" ? FileText : FolderTree;
  const MobileToggleIcon = isMobileDirectoryOpen ? ChevronUp : ChevronDown;
  const openState = {
    ...defaultOpenState,
    ...userOpenState,
    ...activeOpenState,
  };

  useEffect(() => {
    const storedState = window.localStorage.getItem(sidebarOpenStateStorageKey);

    if (storedState) {
      try {
        setUserOpenState(JSON.parse(storedState));
      } catch {
        window.localStorage.removeItem(sidebarOpenStateStorageKey);
      }
    }

    hasLoadedUserState.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoadedUserState.current) {
      return;
    }

    window.localStorage.setItem(
      sidebarOpenStateStorageKey,
      JSON.stringify(userOpenState),
    );
  }, [userOpenState]);

  function handleOpenChange(routePath: string, isOpen: boolean) {
    setUserOpenState((currentState) => ({
      ...currentState,
      [routePath]: isOpen,
    }));
  }

  return (
    <aside className="sticky top-20 z-20 h-fit w-full self-start lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto">
      <nav
        aria-label="Posts directory"
        className="w-full rounded-lg border border-border-subtle bg-surface-overlay-strong p-3 backdrop-blur-xl lg:bg-surface-card lg:backdrop-blur-none"
      >
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 font-medium text-foreground text-sm">
            <ActiveIcon aria-hidden="true" className="shrink-0" size={15} />
            <span className="truncate">
              {isArchiveActive ? "모든 글" : activeItem?.title}
            </span>
          </div>
          <Button
            aria-expanded={isMobileDirectoryOpen}
            aria-label={
              isMobileDirectoryOpen
                ? "사이드바 항목 닫기"
                : "사이드바 항목 열기"
            }
            onClick={() => setIsMobileDirectoryOpen((isOpen) => !isOpen)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <MobileToggleIcon aria-hidden="true" />
          </Button>
        </div>

        <div
          className={cn(
            "mt-3 lg:mt-0",
            !isMobileDirectoryOpen && "hidden lg:block",
          )}
        >
          <p className="mb-2 px-2 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
            Posts
          </p>
          <Link
            aria-current={isArchiveActive ? "page" : undefined}
            className={cn(
              "mb-2 flex min-h-8 items-center gap-2 rounded-md px-2 py-1.5 font-medium text-sm transition-colors hover:bg-surface-subtle hover:text-foreground",
              isArchiveActive
                ? "bg-surface-subtle text-foreground"
                : "text-dim",
            )}
            href="/docs"
            onClick={() => setIsMobileDirectoryOpen(false)}
          >
            <FolderTree aria-hidden="true" size={15} />
            <span>모든 글</span>
          </Link>
          <ul>
            {items.map((item) => (
              <NavigationItem
                activeRouteSegments={activeRouteSegments}
                item={item}
                key={item.routePath}
                level={0}
                onNavigate={() => setIsMobileDirectoryOpen(false)}
                onOpenChange={handleOpenChange}
                openState={openState}
              />
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
