export default function handler(req, res) {
  if (req.method === "POST") {
    const { body } = req;
    res.status(200).json({ data: body });
  }

  res.status(404).send();
}
