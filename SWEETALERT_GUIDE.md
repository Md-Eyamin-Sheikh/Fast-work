# SweetAlert2 Integration Guide

## Overview

This project now uses **SweetAlert2** for beautiful, customizable alert dialogs instead of basic browser alerts. SweetAlert2 provides a much better user experience with styled modals, animations, and flexible options.

## Installation

```bash
npm install sweetalert2 --legacy-peer-deps
```

## Usage

### Import the Utility Functions

```typescript
import {
  showSuccess,
  showError,
  showConfirm,
  showSuccessToast,
  showErrorToast,
} from "@/app/lib/sweetalert";
```

### Available Functions

#### 1. Success Alert

```typescript
await showSuccess("Product added successfully!", "Success!");
```

#### 2. Error Alert

```typescript
showError("Failed to save product", "Error");
```

#### 3. Confirmation Dialog

```typescript
const confirmed = await showConfirm(
  "Are you sure you want to delete this item?",
  "Delete Item?"
);

if (confirmed) {
  // User clicked "Yes, delete it!"
  // Perform delete operation
}
```

#### 4. Success Toast (Top-right notification)

```typescript
showSuccessToast("Changes saved!");
```

#### 5. Error Toast

```typescript
showErrorToast("Something went wrong!");
```

## Utility File Location

📁 **`/app/lib/sweetalert.ts`**

This file contains pre-configured SweetAlert2 functions that maintain consistent styling across the application.

## Components Using SweetAlert2

### Blog Management

- ✅ **WriteBlog.tsx** - Success/error alerts when saving blogs
- ✅ **AllBlogs.tsx** - Confirmation dialog for deleting blogs
- ✅ **ViewBlogs.tsx** - Confirmation dialog for deleting blogs

### Product Management

- ✅ **AddProduct.tsx** - Success/error alerts when saving products
- ✅ **AddProductForm.tsx** - Success/error alerts when adding products

## Customization

You can modify the utility functions in `/app/lib/sweetalert.ts` to change:

- Colors
- Icons
- Button text
- Timer duration
- Position
- Animation effects

### Example Custom Alert

```typescript
import Swal from "sweetalert2";

Swal.fire({
  title: "Custom Alert",
  text: "This is a custom configured alert",
  icon: "info",
  confirmButtonColor: "#3085d6",
  confirmButtonText: "Got it!",
});
```

## Color Scheme

The current configuration uses:

- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Orange)
- **Info**: `#3b82f6` (Blue)
- **Cancel**: `#6b7280` (Gray)

## Toast Notifications

Toast notifications appear in the top-right corner and auto-dismiss after 3 seconds. They include:

- Progress bar
- Auto-hide timer
- Pause on hover
- Icon based on type

## Migration from Old Alerts

### Before (Native Alerts)

```typescript
alert("Blog published successfully!");
if (confirm("Delete this blog?")) {
  // delete
}
```

### After (SweetAlert2)

```typescript
await showSuccess("Blog published successfully!", "Success!");

const confirmed = await showConfirm("Delete this blog?", "Are you sure?");
if (confirmed) {
  // delete
}
```

## Advanced Features

For advanced use cases, you can directly import and use SweetAlert2:

```typescript
import Swal from "sweetalert2";

// Input dialog
const { value: name } = await Swal.fire({
  title: "Enter your name",
  input: "text",
  inputPlaceholder: "Your name",
  showCancelButton: true,
});

// Loading spinner
Swal.fire({
  title: "Processing...",
  didOpen: () => {
    Swal.showLoading();
  },
});
```

## Resources

- 📖 [SweetAlert2 Documentation](https://sweetalert2.github.io/)
- 🎨 [SweetAlert2 Examples](https://sweetalert2.github.io/#examples)
- 💻 [GitHub Repository](https://github.com/sweetalert2/sweetalert2)

## Notes

- All utility functions return Promises, so use `await` when you need to wait for user interaction
- Toast notifications don't block user interaction
- Confirmation dialogs return `true` if confirmed, `false` if cancelled
- The utility wrapper handles all the styling consistently across the app
