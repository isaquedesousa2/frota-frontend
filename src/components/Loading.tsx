interface ISize {
    width?: number;
    height?: number;
}

export function Loading(size: ISize) {
    const { width, height } = size;

    return (
        <div className="flex space-x-2 justify-center items-center">
            <div className={`h-[${height || 20}px] w-[${width || 20}px] bg-[#60dc96] rounded-full animate-bounce [animation-delay:-0.3s]`} />
            <div className={`h-[${height || 20}px] w-[${width || 20}px] bg-[#60dc96] rounded-full animate-bounce [animation-delay:-0.15s]`} />
            <div className={`h-[${height || 20}px] w-[${width || 20}px] bg-[#60dc96] rounded-full animate-bounce`} />
        </div>
    );
}
