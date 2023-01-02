import { useAppSelector } from "../../../../redux/app/hooks";
import TextField from "@mui/material/TextField";
import { Autocomplete, Box, createFilterOptions } from '@mui/material';

const MUIEditAutoComplete = ({ options, onFormChangeHandler, label, formKey, defaultValue }: any) => {
    const { user: { plan } } = useAppSelector((state) => state.user);
    const filter = createFilterOptions();

    // console.log('MUIEditAutoComplete',{ options, onFormChangeHandler, label, formKey, defaultValue })

    // [options[0]]
    // options[0].value.toString()

    return (
        <Box sx={{mb:2}}>
            {plan !== undefined && plan === "pro" ? (
                    <Autocomplete
                        disablePortal
                        multiple
                        size='small'
                        options={options}
                        isOptionEqualToValue={(option, value) => {
                            if(typeof value === "object"){
                                return option.value === value.value
                            }
                            return option.value === value
                        }}
                        defaultValue={defaultValue}
                        value={defaultValue}
                        onChange={(_, e) => {
                            const values = e.map(({value}) => value)
                            if (e) onFormChangeHandler(formKey, values);
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            const isExisting = options.some((option) => inputValue === option?.title);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({label: inputValue.toUpperCase(), value: inputValue.toUpperCase()});
                            }
                            return filtered;
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                            />
                        )}
                    />
                ) :
                (
                    <Autocomplete
                        size='small'
                        disablePortal
                        options={options}
                        defaultValue={defaultValue}
                        value={defaultValue}
                        isOptionEqualToValue={(option, value) => {
                            if(typeof value === "object"){
                                return option.value === value.value
                            }
                            return option.value === value
                        }}
                        onChange={(_, e) => {
                            if (e) onFormChangeHandler(formKey, [e.value]);
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            const isExisting = options.some((option) => inputValue === option?.title);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({ label: inputValue.toUpperCase(), value: inputValue.toUpperCase() });
                            }
                            return filtered;
                        }}
                        renderInput={(params) => <TextField {...params} label={label} sx={{backgroundColor:'white'}} />}
                    />
                )
            }
        </Box>
    );
};

export default MUIEditAutoComplete;
