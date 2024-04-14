import { useEffect, useState } from "react";

import axios from "axios";
import Select from "react-select";


const OptionAdress = ({ adressUser, setAdressUser }) => {

    const [wards, setWards] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setCities(response.data);
                // if(adressUser.city) {
                //     const selectedCityData = response.data.find((city) => city.Id === adressUser.city?.value);
                //     if(selectedCityData) {
                //         setDistricts(selectedCityData.Districts);
                //         if(adressUser.district) {
                //             const selectedDistrictData = selectedCityData.Districts.find((district) => district.Id === adressUser.district?.value);
                //             if(selectedDistrictData) {
                //                 setWards(selectedDistrictData.Wards);
                //             }
                //         }
                //     }
                // }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleChangeOption = (name, selected) => {
        if(selected) {
            if(name === "city") {
                const selectedCityData = cities.find((city) => city.Id === selected.value);
                if (selectedCityData) {
                    setAdressUser({
                        ...adressUser,
                        city: selected,
                        district: null,
                        ward: null
                    });
                    setDistricts(selectedCityData.Districts);
                    setWards([]);
                }
            }
            else if(name === "district") {
                const selectedDistrictData = districts.find((district) => district.Id === selected.value);
                if (selectedDistrictData) {
                    setAdressUser({
                        ...adressUser,
                        district: selected,
                        ward: null
                    })
                    setWards(selectedDistrictData.Wards);
                }
            }
            else if(name === "ward") {
                setAdressUser({
                    ...adressUser,
                    ward: selected
                });
            }
        }
        // ----
        else {
            if(name === "city") {
                setAdressUser({
                    ...adressUser,
                    city: null,
                    district: null,
                    ward: null
                })
            }
            else if(name === "district") {
                setAdressUser({
                    ...adressUser,
                    district: null,
                    ward: null
                })
            }
            else if(name === "ward") {
                setAdressUser({
                    ...adressUser,
                    ward: null
                })
            }
        }
    }

    return (
        <div>
            <SelectComponent
                selectType="city"
                handleOnChange={handleChangeOption}
                options={cities}
                placeholder="Tỉnh"
                selected={adressUser?.city}
            />
            <SelectComponent
                selectType="district"
                handleOnChange={handleChangeOption}
                options={districts}
                placeholder="Quận/Huyện"
                selected={adressUser.district}
            />
            <SelectComponent
                selectType="ward"
                handleOnChange={handleChangeOption}
                options={wards}
                placeholder="Xã"
                selected={adressUser.ward}
            />
        </div>
    );
};

export default OptionAdress;

const SelectComponent = ({ selectType, options, selected, placeholder, handleOnChange }) => (
    <Select
        className="mb-4 basic-single"
        classNamePrefix="select"
        defaultValue={null}
        placeholder={placeholder}
        isClearable={true}
        isSearchable={true}
        name="color"
        value={selected}
        onChange={(selected) => handleOnChange(selectType, selected)}
        options={options.map((option) => {
            return {
                value: option.Id,
                label: option.Name,
            };
        })}
    />
);
