# 🎯 SweetAlert2 Quick Reference

## Import

```typescript
import {
  showSuccess,
  showError,
  showConfirm,
  showSuccessToast,
} from "@/app/lib/sweetalert";
```

## Functions

### Success

```typescript
await showSuccess("Message", "Title");
// Example:
await showSuccess("Blog published successfully!", "Success!");
```

### Error

```typescript
showError("Message", "Title");
// Example:
showError("Failed to save", "Error");
```

### Confirm

```typescript
const confirmed = await showConfirm("Message", "Title");
if (confirmed) {
  // User clicked yes
}
// Example:
const confirmed = await showConfirm("Delete this blog?", "Are you sure?");
```

### Toast

```typescript
showSuccessToast("Message");
showErrorToast("Message");
// Example:
showSuccessToast("Saved!");
```

## Colors

- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Orange (#f59e0b)
- Info: Blue (#3b82f6)

## Docs

- `/app/lib/sweetalert.ts` - Source code
- `SWEETALERT_GUIDE.md` - Full guide
- `SWEETALERT_INTEGRATION.md` - Examples
