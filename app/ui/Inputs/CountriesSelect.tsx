
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select"

export type CountrySelectValue =  {
flag : string;
label : string,
latlng: number[],
region : string, 
value : string


}

interface CountrySelectProps {
    value? : CountrySelectValue,
    onChange : (value : CountrySelectValue) => void
}

const CountriesSelect:React.FC<CountrySelectProps> = ({ value, onChange }) => {
    
    const { getAllCountries, getSingleCountry  } = useCountries()

    return (
    <div>

        <Select  
        placeholder = "Anywhere"
        isClearable
        isSearchable
        options={getAllCountries()}
        value={ value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel =  {(option : any) => (
            <div className="flex flex-row items-center gap-3">
             
                <div>
                    {option.label} 
                </div>

            </div>
        )}
 
          classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg'
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6'
            }
          })}

        
        />
    </div>
  )
}

export default CountriesSelect