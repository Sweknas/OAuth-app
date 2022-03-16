import { ChangeEventHandler } from 'react'
import { createUseStyles } from 'react-jss'

type Props = {
  name: string
  type: string
  text: string
  placeholder: string
  value: string
  valid: boolean | null
  onChange: ChangeEventHandler<HTMLInputElement>
  message: string,
  error: string,
}

const useStyles = createUseStyles({
  fieldGroup: {
    margin: '20px 0px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    paddingLeft: 8,
  },
  input: {
    minWidth: 200,
    outline: 'none',
    border: 'none',
    backgroundColor: '#e3e3e3',
    width: '100%',
    padding: '12px 8px',
    margin: '8px 0px 0px 0px',
    boxSizing: 'border-box',
    borderRadius: 5,
    borderBottom: 'solid 2px transparent',
    transition: '0.3s ease-in-out all',
    '&::placeholder': {
      marginTop: -20
    },
    '&:focus': {
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      borderRadius: 0,
      borderBottom: 'solid 2px #323232',
      transition: '0.3s ease-in-out all',
    },
    '&._error': {
      borderBottom: 'solid 2px #FF0000',
      transition: '0.3s ease-in-out all',
    }
  },
  message: {
    display: 'block',
    color: '#656565',
    fontSize: '12px',
    padding: '0px 0px 0px 8px',
    marginTop: 0,
    '&._error': {
      color: '#FF0000'
    }
  }
})

function InputField ({
  name,
  type,
  text,
  placeholder,
  value,
  valid,
  onChange,
  message,
  error
}: Props) {
  const classes = useStyles()

  return (
    <div key={name} className={classes.fieldGroup}>
      <label
        className={classes.label}
        htmlFor={name}
      >
        {text}
      </label>
      <input
        className={`${classes.input} ${valid === false ? '_error' : ''}`}
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      <span className={`${classes.message} ${error ? '_error' : ''}`}>{error || message}</span>
    </div>

  )
}

export default InputField
