'use client';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import classNames from 'classnames';
import React from 'react';
import { LoadingPulse } from './LoadingPulse';

interface IProps {
    data: IFinesRes | null;
    loading?: boolean;
}

export default function CardFine(props: IProps) {
    const { data, loading = false } = props;

    return (
        <div className="flex flex-col gap-6">
            <LoadingPulse loading={loading} className="h-12">
                <div className="flex flex-row gap-8 border border-x-[3px] border-y-[3px] border-[#283943] rounded-lg bg-[#1e2b33] p-4">
                    <div className="flex flex-row gap-3">
                        <span className="font-semibold">Placa:</span>
                        <span>{data?.plate}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <span className="font-semibold">Classe:</span>
                        <span>{data?.class}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <span className="font-semibold">Renavam:</span>
                        <span>{data?.reindeer}</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <span className="font-semibold">Equipamento:</span>
                        <span>{data?.number}</span>
                    </div>
                </div>
            </LoadingPulse>

            {loading ? (
                <LoadingPulse loading={loading} className="h-80" />
            ) : (
                data?.fines.map((fine, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames('bg-[#1a262d] rounded-xl p-4 flex flex-col gap-8 border border-x-[3px] border-y-[3px]', {
                                'border-[#e83a70]': fine.paid === false,
                                'border-[#60dc96]': fine.paid === true,
                            })}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">
                                        <div className="flex flex-row items-center">
                                            <div className="flex flex-row items-center gap-5">
                                                <span className="bg-[#fed339] text-black font-bold w-[30px] h-[30px] flex items-center justify-center rounded-full">
                                                    {fine.employee.split(' ')[0][0].toUpperCase()}
                                                </span>
                                                <span className="text-sm">{fine.employee}</span>
                                            </div>
                                            <div className="bg-[#778484] w-[4px] h-[4px] rounded-md mx-3" />
                                            <span className="text-sm">{fine.employeeNumber}</span>
                                        </div>
                                        <div className="bg-[#778484] w-[2px] h-6 rounded-md mx-3" />
                                        <span className="font-bold">{fine.description}</span>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-3">
                                            <span className="text-base font-bold">R$ {fine.value}</span>
                                            <span
                                                className={classNames('text-sm text-black font-semibold px-3 py-1 rounded-md', {
                                                    'bg-[#60dc96]': fine.paid === true,
                                                    'bg-[#e83a70]': fine.paid === false,
                                                })}
                                            >
                                                {fine.paid === true ? 'Pago' : 'Pendente'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="bg-[#1e2b33] max-w-[3px] flex-1 rounded-lg" />
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <div className="flex flex-row items-center gap-3">
                                            <LocationOnIcon className="text-gray-400" />
                                            <span className="text-gray-400">
                                                {fine.local} - {fine.country}
                                            </span>
                                        </div>
                                        <span className="text-[#d99c4e] font-semibold">{fine.situation}</span>
                                    </div>
                                </div>
                                <div className="b w-full rounded-xl p-4 flex flex-col gap-9">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-row gap-3">
                                            <span className="font-semibold">Data:</span>
                                            <span>{fine.date}</span>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <span className="font-semibold">Gravidade:</span>
                                            <span>{fine.gravity}</span>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <span className="font-semibold">Viagem:</span>
                                            <span>{fine.coupunNumber}</span>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <span className="font-semibold">Rota:</span>
                                            <span>{fine.route}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
