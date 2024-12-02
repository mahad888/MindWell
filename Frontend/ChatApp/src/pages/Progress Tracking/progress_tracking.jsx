// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   useTheme,
//   Tab,
//   Tabs,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
// import InfoIcon from '@mui/icons-material/Info';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const ProgressTracking = () => {
//   const theme = useTheme();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [stats, setStats] = useState({
//     totalSessions: 0,
//     totalEmotions: 0,
//     completionRate: 0,
//     journalEntries: 0
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const token = localStorage.getItem("auth");

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/getMeditationData', {
//         // method: 'GET', // Optional but improves clarity
//         // credentials: 'include', // Use credentials for cookies or cross-origin requests
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
  
//       const result = await response.json();
//       setData(result);
//       calculateStats(result);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch data');
//       setLoading(false);
//     }
//   };
  

//   const calculateStats = (meditationData) => {
//     const stats = {
//       totalSessions: meditationData.length,
//       totalEmotions: meditationData.reduce((acc, session) => {
//         return acc + 
//           (session.breathingAudio?.allEmotions?.length || 0) +
//           (session.breathingVideo?.allEmotions?.length || 0) +
//           (session.mindfulnessAudio?.allEmotions?.length || 0) +
//           (session.mindfulnessVideo?.allEmotions?.length || 0);
//       }, 0),
//       journalEntries: meditationData.filter(session => 
//         session.mindfulnessVideo?.prompts?.length > 0
//       ).length
//     };

//     const totalPossibleActivities = meditationData.length * 4;
//     const completedActivities = meditationData.reduce((acc, session) => {
//       return acc +
//         (session.breathingAudio?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.breathingVideo?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.mindfulnessAudio?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.mindfulnessVideo?.allEmotions?.length > 0 ? 1 : 0);
//     }, 0);

//     stats.completionRate = Math.round((completedActivities / totalPossibleActivities) * 100);
//     setStats(stats);
//   };

//   const prepareChartData = () => {
//     if (!data) return [];
//     return data.map(session => ({
//       date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       breathingAudio: session.breathingAudio?.allEmotions?.length || 0,
//       breathingVideo: session.breathingVideo?.allEmotions?.length || 0,
//       mindfulnessAudio: session.mindfulnessAudio?.allEmotions?.length || 0,
//       mindfulnessVideo: session.mindfulnessVideo?.allEmotions?.length || 0,
//     }));
//   };

//   const prepareRadarData = () => {
//     if (!data) return [];
//     const totals = data.reduce((acc, session) => {
//       return {
//         breathingAudio: acc.breathingAudio + (session.breathingAudio?.allEmotions?.length || 0),
//         breathingVideo: acc.breathingVideo + (session.breathingVideo?.allEmotions?.length || 0),
//         mindfulnessAudio: acc.mindfulnessAudio + (session.mindfulnessAudio?.allEmotions?.length || 0),
//         mindfulnessVideo: acc.mindfulnessVideo + (session.mindfulnessVideo?.allEmotions?.length || 0),
//       };
//     }, { breathingAudio: 0, breathingVideo: 0, mindfulnessAudio: 0, mindfulnessVideo: 0 });

//     return [
//       { skill: 'Breathing Audio', value: totals.breathingAudio },
//       { skill: 'Breathing Video', value: totals.breathingVideo },
//       { skill: 'Mindfulness Audio', value: totals.mindfulnessAudio },
//       { skill: 'Mindfulness Video', value: totals.mindfulnessVideo },
//     ];
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <Card sx={{ height: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Typography color="textSecondary" variant="subtitle2" gutterBottom>
//               {title}
//             </Typography>
//             <Typography variant="h4" component="div" color={color}>
//               {value}
//             </Typography>
//           </Box>
//           <Box sx={{ 
//             backgroundColor: `${color}15`, 
//             borderRadius: '50%', 
//             p: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {icon}
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3} textAlign="center" color="error.main">
//         <Typography variant="h6">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
//         Meditation Progress Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Stat Cards */}
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Sessions"
//             value={stats.totalSessions}
//             icon={<CalendarTodayIcon sx={{ color: theme.palette.primary.main }} />}
//             color="primary.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Completion Rate"
//             value={`${stats.completionRate}%`}
//             icon={<TrendingUpIcon sx={{ color: theme.palette.success.main }} />}
//             color="success.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Emotions Recorded"
//             value={stats.totalEmotions}
//             icon={<InfoIcon sx={{ color: theme.palette.info.main }} />}
//             color="info.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Journal Entries"
//             value={stats.journalEntries}
//             icon={<AssignmentIcon sx={{ color: theme.palette.warning.main }} />}
//             color="warning.main"
//           />
//         </Grid>

//         {/* Progress Chart */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ height: '100%', boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Activity Timeline
//               </Typography>
//               <Box sx={{ height: 400 }}>
//                 <ResponsiveContainer>
//                   <LineChart data={prepareChartData()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <RechartsTooltip />
//                     <Line 
//                       type="monotone" 
//                       dataKey="breathingAudio" 
//                       stroke={theme.palette.primary.main} 
//                       name="Breathing Audio" 
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="breathingVideo" 
//                       stroke={theme.palette.secondary.main} 
//                       name="Breathing Video" 
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="mindfulnessAudio" 
//                       stroke={theme.palette.success.main} 
//                       name="Mindfulness Audio" 
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="mindfulnessVideo" 
//                       stroke={theme.palette.warning.main} 
//                       name="Mindfulness Video" 
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Radar Chart */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: '100%', boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Skills Distribution
//               </Typography>
//               <Box sx={{ height: 400 }}>
//                 <ResponsiveContainer>
//                   <RadarChart data={prepareRadarData()}>
//                     <PolarGrid />
//                     <PolarAngleAxis dataKey="skill" />
//                     <PolarRadiusAxis />
//                     <Radar
//                       name="Skills"
//                       dataKey="value"
//                       stroke={theme.palette.primary.main}
//                       fill={theme.palette.primary.main}
//                       fillOpacity={0.6}
//                     />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Journal Entries */}
//         <Grid item xs={12}>
//           <Card sx={{ boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Recent Journal Entries
//               </Typography>
//               <Grid container spacing={2}>
//                 {data?.slice(-3).reverse().map((session, idx) => (
//                   session.mindfulnessVideo?.prompts?.length > 0 && (
//                     <Grid item xs={12} md={4} key={idx}>
//                       <Card variant="outlined">
//                         <CardContent>
//                           <Typography variant="subtitle2" color="textSecondary">
//                             {new Date(session.date).toLocaleDateString()}
//                           </Typography>
//                           {session.mindfulnessVideo.prompts.map((prompt, pIdx) => (
//                             <Box key={pIdx} sx={{ mt: 2 }}>
//                               <Typography variant="body2" color="primary">
//                                 {prompt.question}
//                               </Typography>
//                               <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
//                                 {prompt.answer}
//                               </Typography>
//                             </Box>
//                           ))}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   )
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProgressTracking;














// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   useTheme,
//   Tab,
//   Tabs,
//   IconButton,
//   Tooltip,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   ResponsiveContainer
// } from 'recharts';
// import InfoIcon from '@mui/icons-material/Info';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const ProgressTracking = () => {
//   const theme = useTheme();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [dateRange, setDateRange] = useState('last7Days');
//   const [stats, setStats] = useState({
//     totalSessions: 0,
//     totalEmotions: 0,
//     completionRate: 0,
//     journalEntries: 0
//   });

//   useEffect(() => {
//     fetchData();
//   }, [dateRange]);

//   const token = localStorage.getItem("auth");

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/getMeditationData?dateRange=${dateRange}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const result = await response.json();
//       setData(result);
//       calculateStats(result);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch data');
//       setLoading(false);
//     }
//   };

//   const calculateStats = (meditationData) => {
//     const stats = {
//       totalSessions: meditationData.length,
//       totalEmotions: meditationData.reduce((acc, session) => {
//         return acc + 
//           (session.breathingAudio?.allEmotions?.length || 0) +
//           (session.breathingVideo?.allEmotions?.length || 0) +
//           (session.mindfulnessAudio?.allEmotions?.length || 0) +
//           (session.mindfulnessVideo?.allEmotions?.length || 0);
//       }, 0),
//       journalEntries: meditationData.filter(session => 
//         session.mindfulnessVideo?.prompts?.length > 0
//       ).length
//     };

//     const totalPossibleActivities = meditationData.length * 4;
//     const completedActivities = meditationData.reduce((acc, session) => {
//       return acc +
//         (session.breathingAudio?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.breathingVideo?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.mindfulnessAudio?.allEmotions?.length > 0 ? 1 : 0) +
//         (session.mindfulnessVideo?.allEmotions?.length > 0 ? 1 : 0);
//     }, 0);

//     stats.completionRate = Math.round((completedActivities / totalPossibleActivities) * 100);
//     setStats(stats);
//   };

//   const prepareChartData = () => {
//     if (!data) return [];

//     const filteredData = filterDataByDateRange(data);

//     return filteredData.map(session => ({
//       date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       breathingAudio: session.breathingAudio?.allEmotions?.length || 0,
//       breathingVideo: session.breathingVideo?.allEmotions?.length || 0,
//       mindfulnessAudio: session.mindfulnessAudio?.allEmotions?.length || 0,
//       mindfulnessVideo: session.mindfulnessVideo?.allEmotions?.length || 0
//     }));
//   };

//   const filterDataByDateRange = (data) => {
//     const today = new Date();
//     const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
//     const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

//     switch (dateRange) {
//       case 'last7Days':
//         return data.filter(session => new Date(session.date) >= sevenDaysAgo);
//       case 'last14Days':
//         return data.filter(session => new Date(session.date) >= fourteenDaysAgo);
//       case 'lastMonth':
//         return data.filter(session => new Date(session.date) >= oneMonthAgo);
//       default:
//         return data;
//     }
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <Card sx={{ height: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Typography color="textSecondary" variant="subtitle2" gutterBottom>
//               {title}
//             </Typography>
//             <Typography variant="h4" component="div" color={color}>
//               {value}
//             </Typography>
//           </Box>
//           <Box sx={{ 
//             backgroundColor: `${color}15`, 
//             borderRadius: '50%', 
//             p: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {icon}
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3} textAlign="center" color="error.main">
//         <Typography variant="h6">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
//         Meditation Progress Dashboard
//       </Typography>

//       <Box sx={{ mb: 3 }}>
//         <FormControl variant="outlined" size="small">
//           <InputLabel id="date-range-label">Date Range</InputLabel>
//           <Select
//             labelId="date-range-label"
//             id="date-range-select"
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             label="Date Range"
//           >
//             <MenuItem value="last7Days">Last 7 Days</MenuItem>
//             <MenuItem value="last14Days">Last 14 Days</MenuItem>
//             <MenuItem value="lastMonth">Last Month</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Stat Cards */}
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Sessions"
//             value={stats.totalSessions}
//             icon={<CalendarTodayIcon sx={{ color: theme.palette.primary.main }} />}
//             color="primary.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Completion Rate"
//             value={`${stats.completionRate}%`}
//             icon={<TrendingUpIcon sx={{ color: theme.palette.success.main }} />}
//             color="success.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Emotions Recorded"
//             value={stats.totalEmotions}
//             icon={<InfoIcon sx={{ color: theme.palette.info.main }} />}
//             color="info.main"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Journal Entries"
//             value={stats.journalEntries}
//             icon={<AssignmentIcon sx={{ color: theme.palette.warning.main }} />}
//             color="warning.main"
//           />
//         </Grid>

//         {/* Progress Bar Chart */}
//         <Grid item xs={12}>
//           <Card sx={{ height: '100%', boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Daily Progress
//               </Typography>
//               <Box sx={{ height: 400 }}>
//                 <ResponsiveContainer>
//                   <BarChart data={prepareChartData()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <RechartsTooltip />
//                     <Bar dataKey="breathingAudio" fill={theme.palette.primary.main} name="Breathing Audio" />
//                     <Bar dataKey="breathingVideo" fill={theme.palette.secondary.main} name="Breathing Video" />
//                     <Bar dataKey="mindfulnessAudio" fill={theme.palette.success.main} name="Mindfulness Audio" />
//                     <Bar dataKey="mindfulnessVideo" fill={theme.palette.warning.main} name="Mindfulness Video" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Journal Entries */}
//         <Grid item xs={12}>
//           <Card sx={{ boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Recent Journal Entries
//               </Typography>
//               <Grid container spacing={2}>
//                 {filterDataByDateRange(data).slice(-3).reverse().map((session, idx) => (
//                   session.mindfulnessVideo?.prompts?.length > 0 && (
//                     <Grid item xs={12} md={4} key={idx}>
//                       <Card variant="outlined">
//                         <CardContent>
//                           <Typography variant="subtitle2" color="textSecondary">
//                             {new Date(session.date).toLocaleDateString()}
//                           </Typography>
//                           {session.mindfulnessVideo.prompts.map((prompt, pIdx) => (
//                             <Box key={pIdx} sx={{ mt: 2 }}>
//                               <Typography variant="body2" color="primary">
//                                 {prompt.question}
//                               </Typography>
//                               <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
//                                 {prompt.answer}
//                               </Typography>
//                             </Box>
//                           ))}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   )
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProgressTracking;















import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ProgressTracking = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('last7Days');
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalEmotions: 0,
    completionRate: 0,
    journalEntries: 0
  });

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const token = localStorage.getItem("auth");

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getMeditationData?dateRange=${dateRange}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      console.log("Fetched Data:", result);
      setData(result);
      calculateStats(result);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const calculateStats = (meditationData) => {
    const stats = {
      totalSessions: meditationData.length,
      totalEmotions: meditationData.reduce((acc, session) => {
        return acc + 
          (session.breathingAudio?.allEmotions?.length || 0) +
          (session.breathingVideo?.allEmotions?.length || 0) +
          (session.mindfulnessAudio?.allEmotions?.length || 0) +
          (session.mindfulnessVideo?.allEmotions?.length || 0);
      }, 0),
      journalEntries: meditationData.filter(session => 
        session.prompts?.length > 0
      ).length
    };

    const totalPossibleActivities = meditationData.length * 4;
    const completedActivities = meditationData.reduce((acc, session) => {
      return acc +
        (session.breathingAudio?.allEmotions?.length > 0 ? 1 : 0) +
        (session.breathingVideo?.allEmotions?.length > 0 ? 1 : 0) +
        (session.mindfulnessAudio?.allEmotions?.length > 0 ? 1 : 0) +
        (session.mindfulnessVideo?.allEmotions?.length > 0 ? 1 : 0);
    }, 0);

    stats.completionRate = Math.round((completedActivities / totalPossibleActivities) * 100);
    setStats(stats);
  };

  const prepareChartData = () => {
    if (!data) return [];

    const filteredData = filterDataByDateRange(data);

    return filteredData.map(session => ({
      date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      breathingAudio: session.breathingAudio?.allEmotions?.length || 0,
      breathingVideo: session.breathingVideo?.allEmotions?.length || 0,
      mindfulnessAudio: session.mindfulnessAudio?.allEmotions?.length || 0,
      mindfulnessVideo: session.mindfulnessVideo?.allEmotions?.length || 0
    }));
  };

  const filterDataByDateRange = (data) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    switch (dateRange) {
      case 'last7Days':
        return data.filter(session => new Date(session.date) >= sevenDaysAgo);
      case 'last14Days':
        return data.filter(session => new Date(session.date) >= fourteenDaysAgo);
      case 'lastMonth':
        return data.filter(session => new Date(session.date) >= oneMonthAgo);
      default:
        return data;
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ 
            backgroundColor: `${color}15`, 
            borderRadius: '50%', 
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} textAlign="center" color="error.main">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
        Meditation Progress Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="date-range-label">Date Range</InputLabel>
          <Select
            labelId="date-range-label"
            id="date-range-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            label="Date Range"
          >
            <MenuItem value="last7Days">Last 7 Days</MenuItem>
            <MenuItem value="last14Days">Last 14 Days</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            icon={<CalendarTodayIcon sx={{ color: theme.palette.primary.main }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            icon={<TrendingUpIcon sx={{ color: theme.palette.success.main }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Emotions Recorded"
            value={stats.totalEmotions}
            icon={<InfoIcon sx={{ color: theme.palette.info.main }} />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Journal Entries"
            value={stats.journalEntries}
            icon={<AssignmentIcon sx={{ color: theme.palette.warning.main }} />}
            color="warning.main"
          />
        </Grid>

        {/* Progress Bar Chart */}
        <Grid item xs={12}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Progress
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={prepareChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="breathingAudio" fill={theme.palette.primary.main} name="Breathing Audio" />
                    <Bar dataKey="breathingVideo" fill={theme.palette.secondary.main} name="Breathing Video" />
                    <Bar dataKey="mindfulnessAudio" fill={theme.palette.success.main} name="Mindfulness Audio" />
                    <Bar dataKey="mindfulnessVideo" fill={theme.palette.warning.main} name="Mindfulness Video" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Journal Entries */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Journal Entries
              </Typography>
              <Grid container spacing={2}>
                {filterDataByDateRange(data).slice(-3).reverse().map((session, idx) => (
                  session.prompts && session.prompts.length > 0 && (
                    <Grid item xs={12} md={4} key={idx}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" color="textSecondary">
                            {new Date(session.date).toLocaleDateString()}
                          </Typography>
                          {session.prompts.map((prompt, pIdx) => (
                            <Box key={pIdx} sx={{ mt: 2 }}>
                              <Typography variant="body2" color="primary">
                                {prompt.question}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
                                {prompt.answer}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressTracking;