import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Divider 
} from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import moment from 'moment';

const JournalEntry = ({ date, entry }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box 
      sx={{ 
        mb: 2, 
        p: 2, 
        bgcolor: 'background.paper', 
        borderRadius: 1 
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {moment(date).format('MMMM D, YYYY')}
      </Typography>
      <Typography variant="body2">
        {entry}
      </Typography>
    </Box>
  </motion.div>
);

const JournalSection = ({ journal, insights }) => {
  if (!journal || !insights) return null;

  const sentimentData = [
    { 
      name: 'Positive', 
      value: insights.journal_sentiments.sentiment_breakdown.positive_percentage 
    },
    { 
      name: 'Neutral', 
      value: insights.journal_sentiments.sentiment_breakdown.neutral_percentage 
    },
    { 
      name: 'Negative', 
      value: insights.journal_sentiments.sentiment_breakdown.negative_percentage 
    }
  ];

  const COLORS = ['#28A745', '#FFC107', '#DC3545'];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <MoodIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5">Emotional Wellness</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Sentiment Analysis Chart */}
        <Box sx={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Sentiment Breakdown */}
        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          {sentimentData.map((sentiment, index) => (
            <Chip
              key={sentiment.name}
              icon={<SentimentSatisfiedIcon />}
              label={`${sentiment.name}: ${sentiment.value}%`}
              color={['success', 'warning', 'error'][index]}
              variant="outlined"
            />
          ))}
        </Box>

        {/* Overall Mood */}
        <Box 
          sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: 'background.default', 
            borderRadius: 1 
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Overall Mood: {insights.journal_sentiments.overall_mood}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {insights.journal_sentiments.recommendation}
          </Typography>
        </Box>

        {/* Recent Journal Entries */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Journal Entries
        </Typography>
        {journal.map(entry => (
          <JournalEntry 
            key={entry.id} 
            date={entry.date} 
            entry={entry.entry} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default JournalSection;