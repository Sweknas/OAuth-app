import { MouseEventHandler } from 'react'
import { createUseStyles } from 'react-jss'

type Props = {
  type: "button" | "submit" | "reset" | undefined
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
}

const useStyles = createUseStyles({
  button: {
    border: '4px solid transparent',
    borderRadius: 5,
    padding: '8px 12px',
    backgroundColor: '#42d1f5',
    boxShadow: '1px 1px 6px -1px rgba(0, 0, 0, 0.4)',
    fontSize: 14,
    fontWeight: 550,
    color: '#323232',
    transition: '0.3s ease-in-out all',
    '&:disabled': {
      backgroundColor: '#e3e3e3',
      boxShadow: 'none',
    },
    '&:hover:enabled': {
      cursor: 'pointer',
      transition: '0.3s ease-in-out all',
      backgroundColor: 'transparent',
      color: '#42d1f5',
      border: '4px solid #42d1f5',
    }
  }
})

function InputField ({
  type,
  text,
  onClick,
  disabled
}: Props) {
  const classes = useStyles()
  return (
    <button
      className={classes.button}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default InputField
