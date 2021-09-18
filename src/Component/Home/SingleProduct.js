import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,

    },
});

const SingleProduct = (props) => {
    const classes = useStyles();
    const {name, price, imageURL, _id} = props.pd;

    const history = useHistory();
    const handleClick = () =>{
        history.push(`checkout/${_id}`)
    }



     
    return (
        <div className='col-md-4 mb-4'>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia component="img"  width="100%" image={imageURL} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='d-flex justify-content-around align-items-center'>
                <Typography color='secondary' component="h6">
                    Price:৳ {price}
                </Typography>
                <Button onClick={handleClick}  variant="contained" color="secondary">Buy Now</Button>
            </CardActions>
        </Card>
    </div>
    );
};

export default SingleProduct;
