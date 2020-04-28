import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentSevice from '../services/CreateAppointmentSevice';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentSevice = new CreateAppointmentSevice(
      appointmentsRepository,
    );

    const appointment = createAppointmentSevice.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
