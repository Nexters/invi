import create from 'zustand';

interface Coordinate {
  x: number;
  y: number;
}

interface KakaoAddressStore {
  coordinate: Coordinate;
  setCoordinate: (x: number, y: number) => void;
}

const useKakaoAddressStore = create<KakaoAddressStore>((set) => ({
  coordinate: { latitude: 37.566828, longitude: 126.9786567 },
  setCoordinate: (latitude: number, longitude: number) => set({ coordinate: { latitude, longitude } }),
}));

export const useKakaoAddress = () => {
  const coordinate = useKakaoAddressStore((state) => state.coordinate);
  const setCoordinate = useKakaoAddressStore((state) => state.setCoordinate);

  return { coordinate, setCoordinate };
};