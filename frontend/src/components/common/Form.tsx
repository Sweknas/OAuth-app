import { ReactNode, FormEventHandler } from 'react'
import { createUseStyles } from 'react-jss'

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode
};

const useStyles = createUseStyles({
  formWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: { 
    backgroundColor: '#FFFFFF',
    padding: '20px 50px',
    borderRadius: 5,
    boxShadow: '0px 0px 27px 5px rgba(0, 0, 0, 0.7)'
  }
})

function Form ({ onSubmit, children }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.formWrapper}>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  )
}

export default Form
