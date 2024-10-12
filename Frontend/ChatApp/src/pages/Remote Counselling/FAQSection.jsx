import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "What is online counseling?",
    answer: "Online counseling is a convenient way to receive mental health support from a licensed therapist via video calls, phone calls, or messaging. It provides flexibility and accessibility from the comfort of your home."
  },
  {
    question: "Is online therapy effective?",
    answer: "Yes, research has shown that online therapy can be just as effective as in-person therapy for many mental health concerns, including anxiety, depression, and stress."
  },
  {
    question: "How do I choose the right therapist?",
    answer: "You can browse through our list of qualified therapists, read their profiles, and select the one that best fits your needs based on their specialization, experience, and patient reviews."
  },
  {
    question: "What should I expect during my first session?",
    answer: "During your first session, your therapist will ask questions to understand your concerns, goals, and history. This is also an opportunity for you to ask any questions and discuss how therapy will work."
  },
  {
    question: "Is my information confidential?",
    answer: "Absolutely. Your privacy is our top priority. All sessions and information shared with your therapist are kept confidential in accordance with professional ethical standards."
  },
  {
    question: "Can I change my therapist if I’m not comfortable?",
    answer: "Yes, you can switch therapists at any time if you feel that another professional would be a better fit for your needs."
  }
];

const FAQSection = () => {
  return (
    <Stack 
      sx={{ 
        padding: { xs: 2, md: 4 }, 
        marginTop: 4,
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: 4,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto'
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: 4,
          color: '#333',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion 
          key={index} 
          sx={{ 
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: 2,
            '&:before': {
              display: 'none'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#3949ab' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{ 
              padding: '8px 16px',
              '&.Mui-expanded': {
                minHeight: 56
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '16px 24px' }}>
            <Typography sx={{ color: '#6c757d', lineHeight: 1.6 }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default FAQSection;
