import { useSnackbar, SnackbarKey,VariantType } from 'notistack';


type openToastTypes ={
    variant: VariantType,
    text: string
}

export const useToast =()=>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    return {
        openToast: ({variant,text}:openToastTypes)=> enqueueSnackbar(text, { variant }),
        closeToast: (id?: SnackbarKey)=> closeSnackbar(id)
    };
};