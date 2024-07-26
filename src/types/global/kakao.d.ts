declare global {
  interface Window {
    daum: {
      Postcode: new (options: any) => any;
    };
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => {
          setMap: (map: any) => void;
        };
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: any, status: any) => void,
            ) => void;
          };
        };
      };
    };
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: any) => void;
      };
    };
  }
}

export {};
