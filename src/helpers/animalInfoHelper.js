import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const formatTextBlock = (title, info) => {
    return(
    <Box display='flex' >
        <Typography variant="subtitle1" style={{fontWeight: 100, marginRight: '5px', fontSize: '21px'}}> {title} </Typography>
        <Typography variant="subtitle1" style={{fontWeight: 600, marginRight: '3px', fontSize: '21px'}}> {info} </Typography>
    </Box>
    )

}

export function formatBulletInfo(animalData){
    console.log(animalData)
    return(
        
        <Box textAlign='left' style={{fontSize: '25px'}}>
            {formatTextBlock('Nombre: ', animalData.nombre_animal)}
            {formatTextBlock('Visto por última vez: ', animalData.fecha_perdido)}
            {formatTextBlock('Especie: ', animalData.especie)}
            {formatTextBlock('Raza: ', animalData.raza)}
            {formatTextBlock('País: ', animalData.pais)}
            {formatTextBlock('Número de Microchip: ', animalData.microchip)}
        </Box>
    )
}