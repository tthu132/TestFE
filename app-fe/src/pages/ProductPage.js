import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ProductPage() {
    return (
        <div className="App">
            <header className="App-header">
                <Stack spacing={2} direction="row">

                    <Button variant="contained">PRODUCT</Button>
                    <Button variant="outlined">Outlined</Button>
                </Stack>

            </header>
        </div>
    );
}

export default ProductPage;