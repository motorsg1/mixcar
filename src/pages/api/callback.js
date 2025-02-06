export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { transaction_id, result, amount, cart_id } = req.body;
  
      // Log the callback data
      console.log('Callback data:', req.body);
  
      try {
        // Optionally verify the transaction with PayTabs using their Verify API
        // Example (replace with your own logic):
        // const verificationResponse = await fetch('https://secure.paytabs.sa/verify', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer YOUR_SECRET_KEY`,
        //   },
        //   body: JSON.stringify({ transaction_id }),
        // });
  
        // const verificationData = await verificationResponse.json();
  
        if (result === 'CAPTURED') {
          console.log(`Payment successful for cart: ${cart_id}, amount: ${amount}`);
          // Update your database or order system here
        } else {
          console.log(`Payment failed for cart: ${cart_id}`);
          // Handle payment failure logic here
        }
  
        // Respond to PayTabs
        res.status(200).send('Callback received');
      } catch (error) {
        console.error('Error processing callback:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      // Only allow POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  