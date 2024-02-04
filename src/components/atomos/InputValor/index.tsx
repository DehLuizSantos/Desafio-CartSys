import React from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import * as S from './styles';

type IntlCurrencyInputProps = typeof IntlCurrencyInput;

type BrlCurrencyProps = {
  label?: string;
  isRequired?: boolean;
  error?: string;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  setMaskedValue?: React.Dispatch<React.SetStateAction<string>>;
  onChangeEvent?: (data: number) => void;
  onKeyPress?: (e: any) => void;
  onBlur?: (e: any) => void;
  value: number;
  icon?: string;
  id?: string;
  disabled?: boolean;
};

const currencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        // style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const BrlCurrencyComponent = React.forwardRef<IntlCurrencyInputProps, BrlCurrencyProps>(
  (
    {
      label,
      isRequired,
      error,
      disabled,
      setMaskedValue,
      setValue,
      onChangeEvent,
      icon,
      id,
      value,
      onKeyPress,
      onBlur,
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => {
        if (label === 'Margem') {
          maskedValue = maskedValue.replace('R$', '%');
        }

        setValue && setValue(value); // value  (ex: 1234.56)
        if (onChangeEvent) {
          onChangeEvent(value);
        }
        if (setMaskedValue) {
          setMaskedValue(maskedValue); // masked value (ex: R$1234,56)
        }
      },
      [setValue, setMaskedValue, onChangeEvent, label]
    );

    return (
      <S.CurrencyBrlInputContainer icon={icon}>
        <label>{label}</label>
        {isRequired && <span>*</span>}
        {icon && <span className="icon">{icon}</span>}
        <IntlCurrencyInput
          onBlur={(e: any) => onBlur && onBlur(e)}
          inputRef={ref}
          currency="BRL"
          tabIndex={-1}
          id={id}
          onKeyPress={(e) => onKeyPress && onKeyPress(e)}
          disabled={disabled}
          max={9999999999999}
          value={value}
          // @ts-expect-error Erro da lib
          config={currencyConfig}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
      </S.CurrencyBrlInputContainer>
    );
  }
);
BrlCurrencyComponent.displayName = 'BrlCurrencyComponent';
export default BrlCurrencyComponent;
