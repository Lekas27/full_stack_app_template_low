/**
 * Utility class to work with file operations.
 */
export type FileManagerType = {
  /**
   * Download a file from a Blob with the specified filename.
   */
  downloadBlob(blob: Blob, filename: string): void;

  /**
   * Download a file from data (string, Blob, or BlobPart) with the specified filename.
   * If data is not a Blob, it will be converted to a Blob.
   */
  downloadFile(data: BlobPart, filename: string, mimeType?: string): void;
};

export class FileManager implements FileManagerType {
  downloadBlob(blob: Blob, filename: string): void {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  downloadFile(data: BlobPart, filename: string, mimeType = "text/plain"): void {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    this.downloadBlob(blob, filename);
  }
}

export const fileManager: FileManagerType = new FileManager();
