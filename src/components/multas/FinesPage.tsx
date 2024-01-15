'use client';

import { useEffect, useState } from 'react';
import ModalError from '../ModalError';
import AppBar from '../AppBar';
import { LoadingPulse } from '../LoadingPulse';
import FilterFines from '../FilterFines';
import CardFine from '../CardFine';
import { finesService } from '../../services/fines';

export const FinesPageComponent = () => {
    const [data, setData] = useState<IFinesRes[]>([]);
    const [filteredData, setFilteredData] = useState<IFinesRes[]>(data);
    const [searhData, setSearchData] = useState<IFinesRes[]>([]);
    const [message, setMessage] = useState('');

    const { error, loading = true, getFines } = finesService();

    async function searchData() {
        const response = await getFines();

        if (response && response.length > 0) {
            setData(response);
        }
    }

    useEffect(() => {
        searchData();
    }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    function filterSearch(search: React.ChangeEvent<HTMLInputElement>) {
        const lowerSearch = search.target.value.toLowerCase();

        if (lowerSearch === '') {
            setSearchData([]);
            setMessage('');
            return;
        }

        const searhPlate = filteredData.filter((item) => String(item.plate).toLowerCase().includes(lowerSearch));
        const searchNumber = filteredData.filter((item) => String(item.number).toLowerCase().includes(lowerSearch));
        const searchReindeer = filteredData.filter((item) => String(item.reindeer).toLowerCase().includes(lowerSearch));
        const searchEmployeeName = filteredData
            .map((item) => {
                const fines = item.fines.filter((fine) => String(fine.employee).toLowerCase().includes(lowerSearch));

                return fines.length > 0 ? { ...item, fines } : null;
            })
            .filter(Boolean) as IFinesRes[];

        const searchEmployeeCode = filteredData
            .map((item) => {
                const fines = item.fines.filter((fine) => String(fine.employeeNumber).toLowerCase().includes(lowerSearch));

                return fines.length > 0 ? { ...item, fines } : null;
            })
            .filter(Boolean) as IFinesRes[];

        const searchTrip = filteredData
            .map((item) => {
                const fines = item.fines.filter((fine) => String(fine.coupunNumber).toLowerCase().includes(lowerSearch));

                return fines.length > 0 ? { ...item, fines } : null;
            })
            .filter(Boolean) as IFinesRes[];

        const mergedResults = [
            ...new Set([...searhPlate, ...searchNumber, ...searchReindeer, ...searchEmployeeName, ...searchEmployeeCode, ...searchTrip]),
        ];

        if (mergedResults.length <= 0) {
            setSearchData([]);
            setMessage('Sem resultados');
            return;
        }
        setMessage('');

        setSearchData(mergedResults);
    }

    return (
        <main className="flex gap-8 min-h-screen flex-col items-center p-6 bg-[#141E22]">
            {error && <ModalError />}
            <AppBar />
            <div className="flex flex-row items-center justify-between w-full gap-8">
                <h4 className="text-2xl w-1/6 ">Filtros</h4>
                <div className="flex flex-row w-5/6 gap-8">
                    <LoadingPulse loading={loading} className="h-12">
                        <form className="flex-1" onSubmit={() => {}}>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    onChange={filterSearch}
                                    placeholder="Pesquise por motorista, placa, viagem..."
                                    className="focus:outline-none focus:border-[#60dc96] block w-full p-3 ps-10 text-sm text-white border border-x-[3px] border-y-[3px] border-[#1e2b33] rounded-lg bg-[#0f171a]"
                                />
                            </div>
                        </form>
                        <div className="flex flex-row gap-10 flex-3 justify-end item">
                            <span className="flex items-center font-bold px-5">{data.reduce((acc, cur) => cur.fines.length + acc, 0)} Multas</span>
                            <div className="bg-[#1e2b33] w-[5px] rounded-lg" />
                            <button onClick={searchData} className="bg-[#64dc9b] text-black font-bold p-2 rounded-xl">
                                Nova Consulta
                            </button>
                        </div>
                    </LoadingPulse>
                </div>
            </div>
            {/* Parte de baixo */}
            <div className="flex flex-row gap-8 w-full">
                <FilterFines data={data} setFilteredData={setFilteredData} loading={loading} />
                <div className="w-5/6 flex flex-col gap-16 overflow-auto">
                    {message ? (
                        message
                    ) : loading ? (
                        <CardFine loading={loading} data={null} />
                    ) : searhData.length > 0 ? (
                        searhData.map((item, index) => <CardFine key={index} data={item} />)
                    ) : (
                        filteredData.map((item, index) => <CardFine key={index} data={item} />)
                    )}
                </div>
            </div>
        </main>
    );
};
