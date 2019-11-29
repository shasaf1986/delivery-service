import { useCallback, useMemo, useState } from 'react';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';

const useCities = (
  calculator: DeliveryRouteCalculator,
) => useMemo(() => calculator.getCities(), [calculator]);

const useResultMessage = (
  calculator: DeliveryRouteCalculator,
  path: string[],
  mode: number,
  maxStops: number,
) => useMemo(() => {
  if (path.length < 2) {
    return '';
  }
  switch (mode) {
    case 0: {
      const cost = calculator.getDeliveryCost(path);
      return cost !== null ? `The cost is ${cost}` : 'No such route';
    }
    case 1: {
      const [from, to] = path;
      const count = calculator.getPossibleDeliveryRoutes(from, to, {
        maxStops: maxStops > 0 ? maxStops : undefined,
      });
      return `The possible routes are ${count}`;
    }
    case 2: {
      const [from, to] = path;
      const cost = calculator.getPossibleDeliveryRoutes(from, to);
      return cost !== null ? `The cost for the cheapest delivery route is ${cost}` : 'No such route';
    }
    default: {
      throw new Error('unknown case');
    }
  }
}, [path, mode, maxStops, calculator]);

const useReset = (
  setCity: (value: string) => void,
  setPath: (value: string[]) => void,
  setMaxStops: (value: number) => void,
) => useCallback(() => {
  setCity('');
  setMaxStops(-1);
  setPath([]);
}, [setCity, setPath, setMaxStops]);

const useAddCity = (
  setCity: (value: string) => void,
  city: string,
  setPath: (value: string[]) => void,
  path: string[],
) => useCallback(() => {
  setCity('');
  setPath([
    ...path,
    city,
  ]);
}, [setCity, city, setPath, path]);

const useChangeMode = (
  reset: () => void,
  setTab: (value: number) => void,
) => useCallback((tab: number) => {
  setTab(tab);
  reset();
}, [reset, setTab]);

export default function useDeliveryRouteCalculator(calculator: DeliveryRouteCalculator) {
  const [path, setPath] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [maxStops, setMaxStops] = useState(-1);
  const [mode, setMode] = useState(0);
  const cities = useCities(calculator);
  const resultMessage = useResultMessage(calculator, path, mode, maxStops);
  const reset = useReset(setCity, setPath, setMaxStops);
  const addCity = useAddCity(setCity, city, setPath, path);
  const changeMode = useChangeMode(reset, setMode);
  // we allow multi cities in case 1 only
  const canAddCity = !!city && (mode === 0 || path.length < 2);
  // show max stops dropdown for case 2 only
  const showMaxStops = mode === 1;

  return {
    path,
    maxStops,
    setMaxStops,
    setCity,
    city,
    cities,
    resultMessage,
    reset,
    addCity,
    mode,
    changeMode,
    canAddCity,
    showMaxStops,
  };
}
