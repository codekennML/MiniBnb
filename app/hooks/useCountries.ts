import countries from "world-countries"

const worldCountries =  countries.map((country) => ({
    value : country.cca2,
    region : country.region,
    latlng : country.latlng,
    label : country.name.common,
    flag  : country.flag
  

}))

const useCountries  = () => {
    const getAllCountries = () => worldCountries

    const getSingleCountry = (value : string) => {
        return worldCountries.find(country => country.value === value)
    } 


    return {
        getAllCountries, getSingleCountry
    }

}

export default useCountries

