import React, { useMemo } from 'react'
import SelectInput, { Option, SelectInputProps } from '../SelectInput'
import styles from './AccountInput.css'

type Account = { id: string; currency: string; balance: number }

interface AccountInputProps
    extends Omit<
        SelectInputProps,
        'options' | 'selectedOption' | 'onChange' | 'onSearch' | 'textInputValue' | 'withSearch'
    > {
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
            selectedOption={accountToOption(selectedAccount, hideAccountCurrencyIcon)}
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
}

const optionToAccount = (option: Option): Account => ({
    id: option.value,
    ...option.payload,
})

const accountToOption = (account: Account, noPrefix?: boolean): Option => ({
    value: account?.id,
    text: account?.id,
    prefix: !noPrefix && <Currency>{currencyToSymbol[account?.currency]}</Currency>,
    suffix: (
        <>
            <b>{account?.balance}</b>,00 {account?.currency.toUpperCase()}
        </>
    ),
    payload: {
        currency: account?.currency,
        balance: account?.balance,
    },
})

export default AccountInput
