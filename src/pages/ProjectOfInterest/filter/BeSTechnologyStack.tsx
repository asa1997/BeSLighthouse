import * as React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { type Theme, useTheme } from "@mui/material/styles";

const names = [
  "DevOPS and Infrastructure Tool (DO)",
  "Language & Framework (L&F)",
  "Application (A)",
  "Distributed & Decentralized Application (DA)",
  "Open Source Security Tool (S)"
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      !personName.includes(name)
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export function BeSTechnologyStack({ filter, setFilter }: any) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange1 = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  if (personName?.[0] !== filter.BeSTecStack) {
    filter.BeSTecStack = personName?.[0];
    setFilter({ ...filter });
  }
  return (
    <div style={ { width: "100%", backgroundColor: (!personName?.[0] || personName?.[0] === 'Be-Secure Technology Stacks') ? "white" : "lightgreen" } }>
      <FormControl sx={ { width: "100%" } }>
        <Select
          multiple={ false }
          displayEmpty
          value={ personName }
          onChange={ handleChange1 }
          input={ <OutlinedInput /> }
          renderValue={ (selected) => {
            if (selected.length === 0) {
              return <>Be-Secure Technology Stacks</>;
            }
            return selected.join(", ");
          } }
          style={ { height: "35px" } }
        >
          <MenuItem value="Be-Secure Technology Stacks">
            <>All</>
          </MenuItem>
          { names.map((name) => (
            <MenuItem
              key={ name }
              value={ name }
              style={ getStyles(name, personName, theme) }
            >
              { name }
            </MenuItem>
          )) }
        </Select>
      </FormControl>
    </div>
  );
}
