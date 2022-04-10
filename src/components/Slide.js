import { Slide  } from '@mui/material';

export default function TransitionSlide (props) {

    return (
        <Slide 
            { ...props}
            direction="up" 
        />
    );
}