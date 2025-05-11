declare module "next/server" {
  export type NextRequest = any;
  export type NextResponse = any;
  export const NextResponse: {
    next: () => any;
    redirect: (url: URL) => any;
  };
} 