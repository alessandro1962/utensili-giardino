import React, { useState, useEffect } from 'react';
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

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    const savedLocations = localStorage.getItem('locations');
    const savedItems = localStorage.getItem('items');
    if (savedLocations) setLocations(JSON.parse(savedLocations));
    if (savedItems) setItems(JSON.parse(savedItems));
  }, []);

  // Salva i dati nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
    localStorage.setItem('items', JSON.stringify(items));
  }, [locations, items]);

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
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <ConstructionIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestione Utensili e Macchine Casa di Campagna
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
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
            sx={{ flexGrow: 1 }}
          />
          <Button type="submit" variant="contained" startIcon={<AddLocationAltIcon />}>
            Aggiungi location
          </Button>
        </Box>

        {/* Form aggiunta item */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box component="form" onSubmit={handleAggiungiItem} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Aggiungi un nuovo item</Typography>
              
              <TextField
                select
                label="Tipo"
                value={formItem.tipo}
                onChange={e => setFormItem({ ...formItem, tipo: e.target.value as 'utensile' | 'macchina' })}
                size="small"
              >
                <MenuItem value="utensile">Utensile</MenuItem>
                <MenuItem value="macchina">Macchina</MenuItem>
              </TextField>

              <TextField
                select
                label="Icona"
                value={formItem.icona}
                onChange={e => setFormItem({ ...formItem, icona: e.target.value })}
                size="small"
              >
                {(formItem.tipo === 'utensile' ? UTENSILI_ICONS : MACCHINE_ICONS).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option.icon}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Nome"
                value={formItem.nome}
                onChange={e => setFormItem({ ...formItem, nome: e.target.value })}
                size="small"
                required
              />

              <TextField
                label="Descrizione"
                value={formItem.descrizione}
                onChange={e => setFormItem({ ...formItem, descrizione: e.target.value })}
                size="small"
                multiline
                rows={2}
              />

              <TextField
                select
                label="Location"
                value={formItem.location}
                onChange={e => setFormItem({ ...formItem, location: e.target.value })}
                size="small"
              >
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>

              <Button type="submit" variant="contained" color="primary">
                Aggiungi Item
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Filtri */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                select
                label="Filtra per location"
                value={locationFiltro}
                onChange={e => setLocationFiltro(e.target.value)}
                size="small"
                sx={{ flexGrow: 1 }}
              >
                <MenuItem value="Tutte">Tutte le locations</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Filtra per tipo"
                value={tipoFiltro}
                onChange={e => setTipoFiltro(e.target.value as 'tutti' | 'utensile' | 'macchina')}
                size="small"
                sx={{ flexGrow: 1 }}
              >
                <MenuItem value="tutti">Tutti i tipi</MenuItem>
                <MenuItem value="utensile">Utensili</MenuItem>
                <MenuItem value="macchina">Macchine</MenuItem>
              </TextField>
            </Box>
          </CardContent>
        </Card>

        {/* Lista items */}
        <List>
          {itemsFiltrati.map((item, idx) => (
            <Card key={idx} sx={{ mb: 2 }}>
              <CardHeader
                avatar={getIconByValue(item.icona, item.tipo)}
                action={
                  <Tooltip title="Elimina">
                    <IconButton onClick={() => handleDeleteItem(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                title={item.nome}
                subheader={`${item.tipo === 'utensile' ? 'Utensile' : 'Macchina'} - ${item.location}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.descrizione}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default App; 