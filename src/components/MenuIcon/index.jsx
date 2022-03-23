import { forwardRef,useImperativeHandle,useRef ,useState} from 'react'
import TextFieldsIcon from '@material-ui/icons/TextFields';

const MenuIcon = (props, ref) => {

    
    const [icon, setIcon] = useState('');


   
    const handleText = () => {
        setIcon(icon ? '': 'text')
    }

    return (
        <div >
            <span onClick={handleText}>
                <TextFieldsIcon />
            </span>

        </div>
    )
}

export default forwardRef(MenuIcon)