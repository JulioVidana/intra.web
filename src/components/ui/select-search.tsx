'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Pagination } from '@/services/api/core/schema/BaseResponse'

export interface SelectSearchProps<T> {
  label?: string
  value: T | null
  onChange: (value: T | null) => void
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => number | string
  onSearch: (query: string, pagination: Pagination) => Promise<{
    data: T[]
    pagination: Pagination
  }>
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
}

export default function SelectSearch<T>({
  label,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  onSearch,
  placeholder = 'Seleccionar...',
  className = '',
  disabled = false,
  error,
}: SelectSearchProps<T>) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    pageNumber: 0,
    pageSize: 10,
  })

  const fetchOptions = async (searchQuery: string) => {
    setLoading(true)
    try {
      const result = await onSearch(searchQuery, pagination)
      setOptions(result.data)
      setPagination(result.pagination)
    } catch (error) {
      console.error('Error fetching options:', error)
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOptions(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, pagination.pageNumber])

  return (
    <Combobox
      as="div"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className}
    >
      {label && (
        <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
      )}
      <div className="relative mt-2">
        <ComboboxInput
          className={`w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ${
            error ? 'ring-red-500' : 'ring-gray-300'
          } focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
            disabled ? 'bg-gray-100' : ''
          }`}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: T | null) => (option ? getOptionLabel(option) : '')}
          placeholder={placeholder}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
          ) : (
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </ComboboxButton>

        {options.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <ComboboxOption
                key={getOptionValue(option)}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-8 pr-4 ${
                    active ? 'bg-primary text-primary-foreground' : 'text-gray-900'
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {getOptionLabel(option)}
                    </span>

                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-1.5 ${
                          active ? 'text-primary-foreground' : 'text-primary'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </Combobox>
  )
} 