import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ConstructionIcon from '@mui/icons-material/Construction';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BuildIcon from '@mui/icons-material/Build';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import HammerIcon from '@mui/icons-material/Construction';
import ScrewdriverIcon from '@mui/icons-material/Build';
import SawIcon from '@mui/icons-material/Carpenter';
import WrenchIcon from '@mui/icons-material/Handyman';
import GrassIcon from '@mui/icons-material/Grass';
import YardIcon from '@mui/icons-material/Yard';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HardwareIcon from '@mui/icons-material/Hardware';
import BrushIcon from '@mui/icons-material/Brush';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import RoofingIcon from '@mui/icons-material/Roofing';
import ForestIcon from '@mui/icons-material/Forest';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ParkIcon from '@mui/icons-material/Park';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MowerIcon from '@mui/icons-material/Grass';
import TractorIcon from '@mui/icons-material/Agriculture';
import CultivatorIcon from '@mui/icons-material/Yard';

const UTENSILI_ICONS = [
  { label: 'Martello', icon: <HammerIcon color="primary" />, value: 'martello' },
  { label: 'Cacciavite', icon: <ScrewdriverIcon color="secondary" />, value: 'cacciavite' },
  { label: 'Sega', icon: <SawIcon color="success" />, value: 'sega' },
  { label: 'Chiave inglese', icon: <WrenchIcon color="warning" />, value: 'chiave' },
  { label: 'Pala', icon: <HardwareIcon color="error" />, value: 'pala' },
  { label: 'Pennello', icon: <BrushIcon color="info" />, value: 'pennello' },
  { label: 'Attrezzi idraulici', icon: <PlumbingIcon color="primary" />, value: 'idraulici' },
  { label: 'Attrezzi per tetti', icon: <RoofingIcon color="secondary" />, value: 'tetti' },
  { label: 'Altro', icon: <BuildIcon color="action" />, value: 'altro' },
];

const MACCHINE_ICONS = [
  { label: 'Tagliaerba', icon: <MowerIcon color="success" />, value: 'tagliaerba' },
  { label: 'Trattorino', icon: <TractorIcon color="primary" />, value: 'trattorino' },
  { label: 'Motozappa', icon: <CultivatorIcon color="secondary" />, value: 'motozappa' },
  { label: 'Decespugliatore', icon: <GrassIcon color="warning" />, value: 'decespugliatore' },
  { label: 'Motosega', icon: <ForestIcon color="error" />, value: 'motosega' },
  { label: 'Tosaerba elettrico', icon: <ElectricBoltIcon color="info" />, value: 'tosaerba_elettrico' },
  { label: 'Altro', icon: <BuildIcon color="action" />, value: 'altro' },
];

interface Item {
  nome: string;
  descrizione: string;
  location: string;
  icona: string;
  tipo: 'utensile' | 'macchina';
}

function getIconByValue(value: string, tipo: 'utensile' | 'macchina') {
  const icons = tipo === 'utensile' ? UTENSILI_ICONS : MACCHINE_ICONS;
  const found = icons.find(i => i.value === value);
  return found ? found.icon : <BuildIcon />;
}

function App() {
  const [locations, setLocations] = useState<string[]>(["Magazzino", "Garage", "Soffitta"]);
  const [nuovaLocation, setNuovaLocation] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [formItem, setFormItem] = useState<Item>({ 
    nome: "", 
    descrizione: "", 
    location: locations[0], 
    icona: UTENSILI_ICONS[0].value,
    tipo: 'utensile'
  });
  const [locationFiltro, setLocationFiltro] = useState<string>("Tutte");
  const [locationError, setLocationError] = useState<string>("");
  const [tipoFiltro, setTipoFiltro] = useState<'tutti' | 'utensile' | 'macchina'>('tutti');

  const handleAggiungiLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setLocationError("");
    
    if (!nuovaLocation.trim()) {
      setLocationError("Inserisci il nome della location");
      return;
    }
    
    if (locations.includes(nuovaLocation.trim())) {
      setLocationError("Questa location esiste già");
      return;
    }

    const locationTrimmed = nuovaLocation.trim();
    setLocations([...locations, locationTrimmed]);
    setFormItem({ ...formItem, location: locationTrimmed });
    setNuovaLocation("");
  };

  const handleAggiungiItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (formItem.nome && formItem.location) {
      setItems([...items, formItem]);
      setFormItem({ 
        nome: "", 
        descrizione: "", 
        location: locations[0], 
        icona: formItem.tipo === 'utensile' ? UTENSILI_ICONS[0].value : MACCHINE_ICONS[0].value,
        tipo: formItem.tipo 
      });
    }
  };

  const handleDeleteItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const itemsFiltrati = items.filter(item => {
    const locationMatch = locationFiltro === "Tutte" || item.location === locationFiltro;
    const tipoMatch = tipoFiltro === 'tutti' || item.tipo === tipoFiltro;
    return locationMatch && tipoMatch;
  });

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)' }}>
        <Toolbar>
          <ConstructionIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestione Utensili e Macchine Casa di Campagna
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%)' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary">
              Benvenuto!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Qui puoi inserire, modificare e cercare tutti i tuoi utensili e macchine, scegliendo dove sono locati nella tua casa di campagna.
            </Typography>
          </CardContent>
        </Card>
        <Divider sx={{ my: 3 }} />
        {/* Form aggiunta location */}
        <Box component="form" sx={{ display: 'flex', gap: 2, mb: 3 }} onSubmit={handleAggiungiLocation}>
          <TextField
            label="Nuova location"
            variant="outlined"
            size="small"
            value={nuovaLocation}
            onChange={e => {
              setNuovaLocation(e.target.value);
              setLocationError("");
            }}
            error={!!locationError}
            helperText={locationError}
            sx={{ bgcolor: 'white', borderRadius: 1, flexGrow: 1 }}
          />
          <Button type="submit" variant="contained" startIcon={<AddLocationAltIcon />}>
            Aggiungi location
          </Button>
        </Box>
        {/* Form aggiunta item */}
        <Card sx={{ mb: 4, boxShadow: 2, borderRadius: 2 }}>
          <CardContent>
            <Box component="form" onSubmit={handleAggiungiItem} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Aggiungi un nuovo item</Typography>
              <TextField
                select
                label="Tipo"
                value={formItem.tipo}
                onChange={e => setFormItem({ 
                  ...formItem, 
                  tipo: e.target.value as 'utensile' | 'macchina',
                  icona: e.target.value === 'utensile' ? UTENSILI_ICONS[0].value : MACCHINE_ICONS[0].value
                })}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              >
                <MenuItem value="utensile">Utensile</MenuItem>
                <MenuItem value="macchina">Macchina</MenuItem>
              </TextField>
              <TextField
                label="Nome"
                variant="outlined"
                required
                value={formItem.nome}
                onChange={e => setFormItem({ ...formItem, nome: e.target.value })}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Descrizione"
                variant="outlined"
                value={formItem.descrizione}
                onChange={e => setFormItem({ ...formItem, descrizione: e.target.value })}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                select
                label="Location"
                value={formItem.location}
                onChange={e => setFormItem({ ...formItem, location: e.target.value })}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Icona"
                value={formItem.icona}
                onChange={e => setFormItem({ ...formItem, icona: e.target.value })}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              >
                {(formItem.tipo === 'utensile' ? UTENSILI_ICONS : MACCHINE_ICONS).map((ic) => (
                  <MenuItem key={ic.value} value={ic.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {ic.icon} {ic.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained" startIcon={<BuildIcon />}>
                Aggiungi {formItem.tipo === 'utensile' ? 'utensile' : 'macchina'}
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Divider sx={{ my: 3 }} />
        {/* Filtri */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ flexGrow: 0 }}>Inventario:</Typography>
          <TextField
            select
            label="Filtra tipo"
            value={tipoFiltro}
            onChange={e => setTipoFiltro(e.target.value as 'tutti' | 'utensile' | 'macchina')}
            sx={{ minWidth: 180, bgcolor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="tutti">Tutti</MenuItem>
            <MenuItem value="utensile">Utensili</MenuItem>
            <MenuItem value="macchina">Macchine</MenuItem>
          </TextField>
          <TextField
            select
            label="Filtra location"
            value={locationFiltro}
            onChange={e => setLocationFiltro(e.target.value)}
            sx={{ minWidth: 180, bgcolor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="Tutte">Tutte</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </TextField>
        </Box>
        {/* Lista items come card */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {itemsFiltrati.length === 0 && (
            <Card sx={{ minWidth: 250, textAlign: 'center', p: 2 }}>
              <CardContent>
                <Typography>Nessun item trovato per i filtri selezionati.</Typography>
              </CardContent>
            </Card>
          )}
          {itemsFiltrati.map((item, idx) => (
            <Card key={idx} sx={{ minWidth: 250, maxWidth: 300, boxShadow: 2, borderRadius: 2, position: 'relative' }}>
              <CardHeader
                avatar={getIconByValue(item.icona, item.tipo)}
                title={item.nome}
                subheader={`${item.tipo === 'utensile' ? 'Utensile' : 'Macchina'} - ${item.location}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.descrizione || 'Nessuna descrizione'}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title="Elimina">
                  <IconButton onClick={() => handleDeleteItem(idx)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
