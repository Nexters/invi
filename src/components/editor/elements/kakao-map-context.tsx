"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface Coordinate {
  latitude: number;
  longitude: number;
  address: string;
}

interface KakaoAddressContextType {
  coordinate: Coordinate;
  setCoordinate: (latitude: number, longitude: number, address: string) => void;
}

const KakaoAddressContext = createContext<KakaoAddressContextType | undefined>(
  undefined,
);

export function KakaoAddressProvider({ children }: { children: ReactNode }) {
  const [coordinate, setCoordinateState] = useState<Coordinate>({
    latitude: 37.566828,
    longitude: 126.9786567,
    address: "서울 중구 세종대로 110 서울특별시청",
  });

  const setCoordinate = (
    latitude: number,
    longitude: number,
    address: string,
  ) => {
    setCoordinateState({ latitude, longitude, address });
  };

  return (
    <KakaoAddressContext.Provider value={{ coordinate, setCoordinate }}>
      {children}
    </KakaoAddressContext.Provider>
  );
}

export function useKakaoAddress() {
  const context = useContext(KakaoAddressContext);
  if (context === undefined) {
    throw new Error(
      "useKakaoAddress must be used within a KakaoAddressProvider",
    );
  }
  return context;
}
