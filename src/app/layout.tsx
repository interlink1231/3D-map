import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOREA 3D | 대한민국 3차원 지도",
  description: "실제 공간정보를 기반으로 대한민국을 탐색하는 3D 지도 프로젝트",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
