// Utilities
export { cn } from "./lib/utils";

// Theme
export { ThemeProvider, useTheme } from "./theme/theme-provider";
export { ThemeToggle } from "./theme/theme-toggle";

// Components
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export { Input, type InputProps } from "./components/input";
export { Textarea, type TextareaProps } from "./components/textarea";
export { Label, labelVariants } from "./components/label";
export { Checkbox } from "./components/checkbox";
export { Switch } from "./components/switch";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { PasswordInput, type PasswordInputProps } from "./components/password-input";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export { Separator } from "./components/separator";
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/dialog";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/dropdown-menu";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs";
export { Skeleton } from "./components/skeleton";
export { Spinner, spinnerVariants, type SpinnerProps } from "./components/spinner";
export { Alert, AlertTitle, AlertDescription, alertVariants } from "./components/alert";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/tooltip";

// Table Primitives
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/table";

// Data Table System
export {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTablePagination,
  DataTableEmptyState,
  DataTableLoading,
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "./components/data-table";

export type {
  ColumnDef,
  ColumnFiltersState,
  DataTableFacetedFilterOption,
  DataTableFilterableColumn,
  DataTableProps,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from "./components/data-table";

// Form System
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
  FormSection,
  FormActions,
  FormErrorSummary,
  useForm,
  useFormContext,
  useWatch,
  useFieldArray,
  useFormState,
  Controller,
  zodResolver,
  type FormLabelProps,
  type FormSectionProps,
  type FormActionsProps,
  type FormErrorSummaryProps,
  type SubmitHandler,
  type SubmitErrorHandler,
  type UseFormReturn,
  type FieldValues,
  type FieldPath,
  type Control,
} from "./components/form";

// Alert Dialog & Confirmation System
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/alert-dialog";

export {
  ConfirmDialog,
  useConfirm,
  type ConfirmDialogProps,
  type UseConfirmOptions,
} from "./components/confirm-dialog";

// Toast Notification System
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  toastVariants,
  useToast,
  toast,
  Toaster,
  type ToastProps,
  type ToastActionElement,
  type ToastOptions,
  type ToasterToast,
} from "./components/toast";

// File Upload & Media Management System
export {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FilePreview,
  ImageUpload,
  MediaGallery,
  UploadProgress,
  formatBytes,
  getFileCategory,
  matchesAccept,
  validateFile,
  validateFiles,
  type FileUploadProps,
  type FileUploadDropzoneProps,
  type FileUploadItemProps,
  type FileUploadListProps,
  type FilePreviewProps,
  type ImageUploadProps,
  type MediaGalleryProps,
  type UploadProgressProps,
  type FileRejection,
  type FileValidationOptions,
  type MediaItem,
  type UploadFileItem,
  type UploadStatus,
} from "./components/file-upload";

// Layout Primitives & App Shells
export {
  Breadcrumbs,
  PageHeader,
  PageContainer,
  CustomerHeader,
  CustomerFooter,
  CustomerLayout,
  AdminSidebar,
  AdminHeader,
  AdminFooter,
  AdminLayout,
  type PageHeaderProps,
  type PageContainerProps,
  type CustomerHeaderProps,
  type CustomerFooterProps,
  type CustomerLayoutProps,
  type AdminSidebarProps,
  type AdminHeaderProps,
  type AdminFooterProps,
  type AdminLayoutProps,
  type BreadcrumbItem,
  type BreadcrumbsProps,
  type CustomerNavItem,
  type FooterLink,
  type FooterLinkGroup,
  type SocialLink,
  type AdminNavItem,
  type AdminNavGroup,
  type AdminUser,
  createMockAuthAdapter,
  DEFAULT_DEMO_USER,
  type AuthAdapter,
  type AuthResult,
  type LoginCredentials,
  type MockAuthAdapterOptions,
  type User,
} from "./components/layout";
