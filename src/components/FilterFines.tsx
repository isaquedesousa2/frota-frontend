'use client';
import classNames from 'classnames';
import { useState } from 'react';
import SelectFilterFine from './SelectFilterFine';
import { LoadingPulse } from './LoadingPulse';

interface IProps {
    data: IFinesRes[];
    loading: boolean;
    setFilteredData: React.Dispatch<React.SetStateAction<IFinesRes[]>>;
}
export default function FilterFines(props: IProps) {
    const { data, setFilteredData, loading } = props;

    const uniqueLocations = [...new Set(data.flatMap((item) => item.fines.map((fine) => fine.local)))];
    const uniqueCountrys = [...new Set(data.flatMap((item) => item.fines.map((fine) => fine.country)))];
    const uniqueSituations = [...new Set(data.flatMap((item) => item.fines.map((fine) => fine.situation)))];
    const uniquePlates = [...new Set(data.flatMap((item) => item.plate))];
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedSituation, setSelectedSituation] = useState<string>('');
    const [selectedPlate, setSelectedPlate] = useState<string>('');
    const [statusPaymentsSelected, setStatusPaymentsSelected] = useState<number | null>(null);

    function selectPayment(option: number) {
        if (option === 1) {
            if (statusPaymentsSelected === 1) {
                setStatusPaymentsSelected(null);
            } else {
                setStatusPaymentsSelected(1);
            }
        }
        if (option === 2) {
            if (statusPaymentsSelected === 2) {
                setStatusPaymentsSelected(null);
            } else {
                setStatusPaymentsSelected(2);
            }
        }
    }

    function clearFilters() {
        setSelectedLocation('');
        setSelectedCountry('');
        setSelectedSituation('');
        setSelectedPlate('');
        setStatusPaymentsSelected(null);

        setFilteredData(data);
    }

    function filterData() {
        const filterStatus: IFinesRes[] = data
            .map((item) => {
                const fines = item.fines.filter((fine) => {
                    if (!statusPaymentsSelected) {
                        return true;
                    }

                    if (statusPaymentsSelected === 1 && fine.paid) {
                        return true;
                    }

                    if (statusPaymentsSelected === 2 && !fine.paid) {
                        return true;
                    }

                    return false;
                });

                return fines.length > 0 ? { ...item, fines } : null;
            })
            .filter(Boolean) as IFinesRes[];

        const filter: IFinesRes[] = filterStatus
            .flatMap((item) => {
                const fines = item.fines.filter((fine) => {
                    const locationCondition = !selectedLocation || fine.local === selectedLocation;
                    const countryCondition = !selectedCountry || fine.country === selectedCountry;
                    const situationCondition = !selectedSituation || fine.situation === selectedSituation;

                    return locationCondition && countryCondition && situationCondition;
                });
                const situationPlate = !selectedPlate || item.plate === selectedPlate;

                return situationPlate && fines.length > 0 ? { ...item, fines } : null;
            })
            .filter(Boolean) as IFinesRes[];

        setFilteredData(filter);
    }

    return (
        <div className="w-1/6 h-[700px] bg-[#1a262d] rounded-xl p-4 gap-7 flex flex-col border border-x-[3px] border-y-[3px] border-[#283943]">
            <div className="flex flex-col gap-3">
                <span className="text-sm">Satus de pagamento</span>
                <div className="flex flex-wrap gap-4 w-full flex-col">
                    <LoadingPulse loading={loading} className="h-12">
                        <div
                            onClick={() => selectPayment(1)}
                            className={classNames(
                                'cursor-pointer flex-1 border border-x-[3px] border-y-[3px] rounded-lg px-5 py-2 flex flex-row items-center justify-between gap-3',
                                {
                                    'border-[#283943]': statusPaymentsSelected === null || statusPaymentsSelected === 2,
                                    'border-[#60dc96]': statusPaymentsSelected === 1,
                                },
                            )}
                        >
                            <span className="text-sm">Pago</span>
                            <span className="border border-x-[3px] border-y-[3px] rounded-lg max-full border-[#283943] px-2 py-1 text-sm">
                                {data.reduce(
                                    (accOuter, curOuter) =>
                                        accOuter + curOuter.fines.reduce((accInner, curFine) => (curFine.paid === true ? accInner + 1 : accInner), 0),
                                    0,
                                )}
                            </span>
                        </div>
                    </LoadingPulse>
                    <LoadingPulse loading={loading} className="h-12">
                        <div
                            onClick={() => selectPayment(2)}
                            className={classNames(
                                'cursor-pointer flex-1 border border-x-[3px] border-y-[3px] rounded-lg px-5 py-2 flex flex-row items-center justify-between gap-3',
                                {
                                    'border-[#283943]': statusPaymentsSelected === null || statusPaymentsSelected === 1,
                                    'border-[#60dc96]': statusPaymentsSelected === 2,
                                },
                            )}
                        >
                            <span className="text-sm">Pendente</span>
                            <span className="border border-x-[3px] border-y-[3px] max-full rounded-md text-center border-[#283943] px-2 py-1 text-sm">
                                {data.reduce(
                                    (accOuter, curOuter) =>
                                        accOuter +
                                        curOuter.fines.reduce((accInner, curFine) => (curFine.paid === false ? accInner + 1 : accInner), 0),
                                    0,
                                )}
                            </span>
                        </div>
                    </LoadingPulse>
                </div>
            </div>
            <div className="flex flex-col justify-between flex-1 gap-12">
                <div className="flex flex-col gap-3">
                    <span className="text-sm">Filtrar por</span>
                    <div className="flex flex-col gap-4">
                        <LoadingPulse loading={loading} className="h-12">
                            <SelectFilterFine
                                data={uniqueLocations}
                                title="Localidade"
                                selected={selectedLocation}
                                setSelected={setSelectedLocation}
                            />
                        </LoadingPulse>
                        <LoadingPulse loading={loading} className="h-12">
                            <SelectFilterFine data={uniqueCountrys} title="Município" selected={selectedCountry} setSelected={setSelectedCountry} />
                        </LoadingPulse>
                        <LoadingPulse loading={loading} className="h-12">
                            <SelectFilterFine
                                data={uniqueSituations}
                                title="Situação"
                                selected={selectedSituation}
                                setSelected={setSelectedSituation}
                            />
                        </LoadingPulse>
                        <LoadingPulse loading={loading} className="h-12">
                            <SelectFilterFine data={uniquePlates} title="Placa" selected={selectedPlate} setSelected={setSelectedPlate} />
                        </LoadingPulse>
                    </div>
                </div>
                <LoadingPulse loading={loading} className="h-12">
                    <div
                        onClick={filterData}
                        className="cursor-pointer w-full border border-x-[3px] border-y-[3px] border-[#283943] rounded-lg bg-[#1e2b33] h-14 flex items-center justify-center"
                    >
                        <span className="text-sm">Filtrar</span>
                    </div>
                </LoadingPulse>
                <LoadingPulse loading={loading} className="h-12">
                    <div
                        onClick={clearFilters}
                        className="cursor-pointer w-full border border-x-[3px] border-y-[3px] border-[#283943] rounded-lg bg-[#1e2b33] h-14 flex items-center justify-center"
                    >
                        <span className="text-sm">Limpar filtros</span>
                    </div>
                </LoadingPulse>
            </div>
        </div>
    );
}
