import type * as React from "react";

declare module "sonner" {
    // Options available for customizing the toast appearance and behavior.
    export interface ToastOptions {
        /**
         * Duration in milliseconds for which the toast is visible.
         * Default may be defined by the library.
         */
        duration?: number;
        /**
         * Inline styles to customize the toast.
         */
        style?: React.CSSProperties;
        // You can add other option fields as needed.
    }

    // The complete API available on the toast object.
    export interface ToastType {
        /**
         * Show a success toast.
         *
         * @param message - The message to display.
         * @param options - Optional customization options.
         */
        success(message: string, options?: ToastOptions): void;

        /**
         * Show an error toast.
         *
         * @param message - The message to display.
         * @param options - Optional customization options.
         */
        error(message: string, options?: ToastOptions): void;

        /**
         * Show a general message toast.
         *
         * @param message - The message to display.
         * @param options - Optional customization options.
         */
        message(message: string, options?: ToastOptions): void;

        /**
         * Show an informational toast.
         *
         * @param message - The message to display.
         * @param options - Optional customization options.
         */
        info(message: string, options?: ToastOptions): void;

        /**
         * Display a toast that reflects the state of a promise.
         *
         * @param promise - The promise to monitor.
         * @param pendingMessage - The message to display while the promise is pending.
         * @param options - Optional customization options.
         * @returns The resolved value of the promise.
         */
        promise<T>(
            promise: Promise<T>,
            pendingMessage: string,
            options?: ToastOptions
        ): Promise<T>;

        /**
         * Dismiss a specific toast by id, or all toasts if no id is provided.
         *
         * @param id - (Optional) The identifier of the toast to dismiss.
         */
        dismiss(id?: string): void;
    }

    // Export the toast object with the above methods.
    export const toast: ToastType;

    // Optionally, if the library also exports a Toaster component for rendering the notifications:
    export interface ToasterProps {
        /**
         * Where the toasts should appear on the screen.
         */
        position?:
        | "top-right"
        | "top-center"
        | "top-left"
        | "bottom-right"
        | "bottom-center"
        | "bottom-left";
        /**
         * Additional container styles.
         */
        containerStyle?: React.CSSProperties;
        // Add other props as required.
    }

    export function Toaster(props: ToasterProps): JSX.Element;
}
