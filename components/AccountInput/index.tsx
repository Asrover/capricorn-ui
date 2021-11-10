import React, { useMemo } from 'react'
import SelectInput, { Option, SelectInputProps } from '../SelectInput'
import styles from './AccountInput.css'

type Account = { id: string; currency: string; balance: number; payload?: any }

export interface AccountInputProps
    extends Omit<SelectInputProps, 'options' | 'value' | 'onChange' | 'onSearch' | 'textInputValue' | 'withSearch'> {
    accounts: Account[]
    onChangeAccount: (account?: Account) => void
    selectedAccount: Account
    hideAccountCurrencyIcon?: boolean
}

const AccountInput: React.FC<AccountInputProps> = ({
    accounts,
    hideAccountCurrencyIcon,
    onChangeAccount,
    selectedAccount,
    ...rest
}) => {
    const options = useMemo(() => accounts.map((account) => accountToOption(account, hideAccountCurrencyIcon)), [
        accounts,
    ])

    const onChange = (option) => {
        if (option) {
            onChangeAccount(optionToAccount(option))
        }
    }

    return (
        <SelectInput
            {...rest}
            multiple={false}
            value={accountToOption(selectedAccount, hideAccountCurrencyIcon)}
            options={options}
            onChange={onChange}
            textInputStyles={{ fontWeight: 600 }}
        />
    )
}

const Currency: React.FC = ({ children }) => <div className={styles.currency}>{children}</div>

const currencyToSymbol = {
    eur: '€',
    usd: '$',
    gbp: '£',
    rur: '₽',
}

const optionToAccount = (option: Option): Account => ({
    id: option.value,
    ...option.payload,
})

const accountToOption = (account: Account, noPrefix?: boolean): Option => ({
    value: account?.id,
    text: account?.id,
    prefix: !noPrefix && <Currency>{currencyToSymbol[account?.currency.toLowerCase()]}</Currency>,
    suffix: (
        <>
            {formatBalance(account?.balance)} {account?.currency.toUpperCase()}
        </>
    ),
    payload: {
        currency: account?.currency,
        balance: account?.balance,
        payload: account?.payload,
    },
})

const formatBalance = (balance?: number | string) => {
    if (balance === undefined) return ''
    const [integer, float] = convertExponentialToDecimal(Number(balance)).toString().split('.')

    return (
        <>
            <b>{integer}</b>.{float || '00'}
        </>
    )
}

const convertExponentialToDecimal = (exponentialNumber: number | string): number | string => {
    const str = exponentialNumber.toString()
    if (str.indexOf('e-') !== -1) {
        const exponent = parseInt(str.split('-')[1], 10)
        return Number(exponentialNumber).toFixed(exponent)
    } else {
        return exponentialNumber
    }
}

export default AccountInput
