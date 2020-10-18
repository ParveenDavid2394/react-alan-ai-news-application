import React, { createRef, useEffect, useState } from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core'

import useStyles from './style'
import classNames from 'classnames'

const NewsCard = ({ article: { 
    description, 
    publishedAt, 
    source, 
    title, 
    url, 
    urlToImage}, i, activeArticle}) => {

    const [elRefs, setElRefs] = useState([])
    const scrollToRef = ref => window.scroll(0, ref.current.offSet - 50)

    useEffect(()=>{
        setElRefs(refs => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    const classes = useStyles()

    return(
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard: null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://www.dailynews.com/wp-content/uploads/2017/09/img_3776.jpg'} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="body2" component="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography> 
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="body2" component="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard