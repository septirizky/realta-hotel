export const helloBooking = async (req, res) => {
  try {
    return res.status(200).json({ message: 'hello from booking' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
