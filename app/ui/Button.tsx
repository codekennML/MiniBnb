import React from 'react'
import { cva, VariantProps } from "class-variance-authority"
import { IconType } from 'react-icons'


const buttonStyles = cva("relative border  rounded-lg hover:opacity-80 transition ", {

  variants: {
    intent: {
      primary: "bg-brand text-bright border-rose-500 ",
      outline: "bg-bright border-slate-800 text-slate-800"
    },

    isDisabled: {
      true: "opacity-70, cursor-not-allowed"
    },

    small: {
      true: "text-sm py-1 font-light border-[1px]",
      false: "text-md py-3 font-semibold border-2"
    },
    fullWidth: {
      false: "px-4",
      true: "w-full"
    }


  }
  , defaultVariants: {
    intent: "primary",
    small: false,
    fullWidth: true

  }
})



interface ButtonProps {
  label: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean,
  icon?: IconType,
  isSubmitting?: boolean

}

export interface Props extends ButtonProps, VariantProps<typeof buttonStyles> { }

const Button = ({ intent, disabled, fullWidth, onClick, label, small, isSubmitting = false, icon: Icon }: Props) => {

  return (
    <>

      <button onClick={onClick} className={buttonStyles({ intent, isDisabled: disabled, small, })} disabled={disabled} >

        {Icon && (
          <Icon
            size={24}
            className="absolute left-4 top-3"
          />
        )}
        <div className="flex flex-row items-center justify-center space-x-4">
          <p>{label}</p>
          <p> {
            isSubmitting &&
            <svg className="w-6 h-6 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}</p>



        </div>


      </button>
    </>
  )
}



export default Button