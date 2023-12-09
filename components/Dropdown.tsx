import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { Option } from "react-tailwindcss-select/dist/components/type";

interface Props {
  searchQuery: Option | Option[] | null | undefined;
  setSearchQuery: (query: Option | Option[] | null | undefined) => void;
  searchable: boolean;
  options: Option[];
}

const Dropdown = ({ searchQuery, setSearchQuery, searchable, options }: Props) => {
    const handleChange = (value?: Option | Option[] | null | undefined) => {
        console.log("value:", value);
        setSearchQuery(value);
    };

    return (
        <Select
            value={searchQuery ?? null}
            onChange={handleChange}
            options={options}
            primaryColor="orange"
            isSearchable={searchable}
        />
    );
};

export default Dropdown;