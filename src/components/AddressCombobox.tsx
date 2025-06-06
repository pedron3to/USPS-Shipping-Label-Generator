"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// US States and Cities (for demo, only a few cities per state for brevity)
const US_STATES = [
  { value: 'AL', label: 'Alabama', cities: ['Birmingham', 'Montgomery', 'Mobile'] },
  { value: 'AK', label: 'Alaska', cities: ['Anchorage', 'Juneau', 'Fairbanks'] },
  { value: 'AZ', label: 'Arizona', cities: ['Phoenix', 'Tucson', 'Mesa'] },
  { value: 'AR', label: 'Arkansas', cities: ['Little Rock', 'Fort Smith', 'Fayetteville'] },
  { value: 'CA', label: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] },
  { value: 'CO', label: 'Colorado', cities: ['Denver', 'Colorado Springs', 'Aurora'] },
  { value: 'CT', label: 'Connecticut', cities: ['Bridgeport', 'New Haven', 'Hartford'] },
  { value: 'DE', label: 'Delaware', cities: ['Wilmington', 'Dover', 'Newark'] },
  { value: 'FL', label: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
  { value: 'GA', label: 'Georgia', cities: ['Atlanta', 'Augusta', 'Savannah'] },
  { value: 'HI', label: 'Hawaii', cities: ['Honolulu', 'Hilo', 'Kailua'] },
  { value: 'ID', label: 'Idaho', cities: ['Boise', 'Meridian', 'Nampa'] },
  { value: 'IL', label: 'Illinois', cities: ['Chicago', 'Aurora', 'Naperville'] },
  { value: 'IN', label: 'Indiana', cities: ['Indianapolis', 'Fort Wayne', 'Evansville'] },
  { value: 'IA', label: 'Iowa', cities: ['Des Moines', 'Cedar Rapids', 'Davenport'] },
  { value: 'KS', label: 'Kansas', cities: ['Wichita', 'Overland Park', 'Kansas City'] },
  { value: 'KY', label: 'Kentucky', cities: ['Louisville', 'Lexington', 'Bowling Green'] },
  { value: 'LA', label: 'Louisiana', cities: ['New Orleans', 'Baton Rouge', 'Shreveport'] },
  { value: 'ME', label: 'Maine', cities: ['Portland', 'Lewiston', 'Bangor'] },
  { value: 'MD', label: 'Maryland', cities: ['Baltimore', 'Frederick', 'Rockville'] },
  { value: 'MA', label: 'Massachusetts', cities: ['Boston', 'Worcester', 'Springfield'] },
  { value: 'MI', label: 'Michigan', cities: ['Detroit', 'Grand Rapids', 'Warren'] },
  { value: 'MN', label: 'Minnesota', cities: ['Minneapolis', 'Saint Paul', 'Rochester'] },
  { value: 'MS', label: 'Mississippi', cities: ['Jackson', 'Gulfport', 'Southaven'] },
  { value: 'MO', label: 'Missouri', cities: ['Kansas City', 'Saint Louis', 'Springfield'] },
  { value: 'MT', label: 'Montana', cities: ['Billings', 'Missoula', 'Great Falls'] },
  { value: 'NE', label: 'Nebraska', cities: ['Omaha', 'Lincoln', 'Bellevue'] },
  { value: 'NV', label: 'Nevada', cities: ['Las Vegas', 'Henderson', 'Reno'] },
  { value: 'NH', label: 'New Hampshire', cities: ['Manchester', 'Nashua', 'Concord'] },
  { value: 'NJ', label: 'New Jersey', cities: ['Newark', 'Jersey City', 'Paterson'] },
  { value: 'NM', label: 'New Mexico', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho'] },
  { value: 'NY', label: 'New York', cities: ['New York', 'Buffalo', 'Rochester', 'Albany'] },
  { value: 'NC', label: 'North Carolina', cities: ['Charlotte', 'Raleigh', 'Greensboro'] },
  { value: 'ND', label: 'North Dakota', cities: ['Fargo', 'Bismarck', 'Grand Forks'] },
  { value: 'OH', label: 'Ohio', cities: ['Columbus', 'Cleveland', 'Cincinnati'] },
  { value: 'OK', label: 'Oklahoma', cities: ['Oklahoma City', 'Tulsa', 'Norman'] },
  { value: 'OR', label: 'Oregon', cities: ['Portland', 'Eugene', 'Salem'] },
  { value: 'PA', label: 'Pennsylvania', cities: ['Philadelphia', 'Pittsburgh', 'Allentown'] },
  { value: 'RI', label: 'Rhode Island', cities: ['Providence', 'Warwick', 'Cranston'] },
  { value: 'SC', label: 'South Carolina', cities: ['Charleston', 'Columbia', 'North Charleston'] },
  { value: 'SD', label: 'South Dakota', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen'] },
  { value: 'TN', label: 'Tennessee', cities: ['Nashville', 'Memphis', 'Knoxville'] },
  { value: 'TX', label: 'Texas', cities: ['Houston', 'San Antonio', 'Dallas', 'Austin'] },
  { value: 'UT', label: 'Utah', cities: ['Salt Lake City', 'West Valley City', 'Provo'] },
  { value: 'VT', label: 'Vermont', cities: ['Burlington', 'South Burlington', 'Rutland'] },
  { value: 'VA', label: 'Virginia', cities: ['Virginia Beach', 'Norfolk', 'Chesapeake'] },
  { value: 'WA', label: 'Washington', cities: ['Seattle', 'Spokane', 'Tacoma'] },
  { value: 'WV', label: 'West Virginia', cities: ['Charleston', 'Huntington', 'Morgantown'] },
  { value: 'WI', label: 'Wisconsin', cities: ['Milwaukee', 'Madison', 'Green Bay'] },
  { value: 'WY', label: 'Wyoming', cities: ['Cheyenne', 'Casper', 'Laramie'] },
] as const;

interface AddressComboboxProps {
  type: 'state' | 'city';
  value: string;
  onValueChange: (value: string) => void;
  stateValue?: string; // Required for city selection
  disabled?: boolean;
  className?: string;
}

export function AddressCombobox({
  type,
  value,
  onValueChange,
  stateValue,
  disabled = false,
  className,
}: AddressComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const items = React.useMemo(() => {
    let baseItems;
    if (type === 'state') {
      baseItems = US_STATES;
    } else {
      const state = US_STATES.find(s => s.value === stateValue);
      baseItems = state?.cities.map(city => ({ value: city, label: city })) ?? [];
    }
    if (!search) return baseItems;
    // For states, filter by label (case-insensitive)
    if (type === 'state') {
      return baseItems.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
    }
    // For cities, filter by value (case-insensitive)
    return baseItems.filter(item =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [type, stateValue, search]);

  const selectedItem = React.useMemo(() => {
    if (type === 'state') {
      return US_STATES.find(state => state.value === value);
    } else {
      return items.find(item => item.value === value);
    }
  }, [type, value, items]);

  const handleSelect = React.useCallback((currentValue: string) => {
    onValueChange(currentValue === value ? "" : currentValue);
    setOpen(false);
  }, [value, onValueChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled || (type === 'city' && !stateValue)}
        >
          {selectedItem?.label ?? `Select ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${type}...`}
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 