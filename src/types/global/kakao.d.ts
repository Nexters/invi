declare global {
  interface Window {
    daum: {
      Postcode: any;
    },
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => {
          setMap: (map: any) => void;
        };
      };
    };
  }
}

export {};