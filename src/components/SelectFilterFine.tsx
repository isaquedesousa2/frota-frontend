import classNames from 'classnames';

type SelectFilterFineProps = {
    data: string[];
    title: string;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectFilterFine({ data, title, selected, setSelected }: SelectFilterFineProps) {
    return (
        <select
            onChange={(e) => setSelected(e.target.value)}
            className={classNames('text-sm p-3 rounded-lg border border-x-[3px] border-y-[3px]  bg-[#1e2b33]', {
                'border-[#283943]': selected === '',
                'border-[#60dc96]': selected !== '',
            })}
            value={selected}
        >
            <option value="">{title}</option>
            {data.map((value, index) => (
                <option key={index} className="m-3" value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}
