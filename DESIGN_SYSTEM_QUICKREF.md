# 🎨 Design System - Quick Reference

## Import

```tsx
import {
  colors,
  buttonStyles,
  badgeStyles,
  cardStyles,
  gradients,
} from "@/app/lib/design-system";
```

## Primary Colors

- **Blue:** `colors.primary[600]` → `#2563eb`
- **Indigo:** `colors.secondary[600]` → `#4f46e5`
- **Orange:** `colors.accent[600]` → `#ea580c`

## Buttons

```tsx
<button className={buttonStyles.primary}>Primary</button>
<button className={buttonStyles.accent}>Accent</button>
<button className={buttonStyles.secondary}>Secondary</button>
<button className={buttonStyles.outline}>Outline</button>
<button className={buttonStyles.glass}>Glass</button>
```

## Badges

```tsx
<span className={badgeStyles.primary}>Category</span>
<span className={badgeStyles.success}>Published</span>
<span className={badgeStyles.warning}>Draft</span>
<span className={badgeStyles.error}>Archived</span>
```

## Cards

```tsx
<div className={cardStyles.default}>Standard Card</div>
<div className={cardStyles.elevated}>Elevated Card</div>
<div className={cardStyles.glass}>Glass Card</div>
```

## Gradients

```tsx
className={gradients.primary}                // Blue → Indigo
className={`${gradients.primary} ${gradients.primaryHover}`}  // With hover
className={gradients.accent}                 // Orange
className={gradients.glass}                  // Frosted glass
```

## Typography

```tsx
<h1 className={textStyles.h1}>Heading 1</h1>
<p className={textStyles.body}>Body text</p>
```

## Common Patterns

```tsx
// Primary CTA Button
<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
  Click Me
</button>

// Category Badge
<span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold rounded-full shadow-lg">
  Technology
</span>

// Glass Button (Dark BG)
<button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold rounded-full shadow-lg">
  Action
</button>
```

## Files

- Design System: `/app/lib/design-system.ts`
- Bottom Nav Example: `/app/components/BottomNav.tsx`
- Full Guide: `DESIGN_SYSTEM_GUIDE.md`
