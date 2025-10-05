'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/container/Container';
import { Section } from '../ui/section/Section';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card/Card';
import { CheckCircle, Clock, AlertCircle, Calendar, Check, X } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Revisar pull requests',
    description: 'Revisar y aprobar los pull requests pendientes del equipo.',
    status: 'completed',
    dueDate: 'Hoy',
    priority: 'Alta',
  },
  {
    id: 2,
    title: 'Actualizar documentación',
    description: 'Actualizar la documentación de la API con los últimos cambios.',
    status: 'in-progress',
    dueDate: 'Mañana',
    priority: 'Media',
  },
  {
    id: 3,
    title: 'Corregir bug en autenticación',
    description: 'Resolver el problema con el refresh token en dispositivos móviles.',
    status: 'pending',
    dueDate: '15 Oct',
    priority: 'Alta',
  },
  {
    id: 4,
    title: 'Reunión de equipo',
    description: 'Reunión semanal para revisar el progreso y planificar los siguientes pasos.',
    status: 'pending',
    dueDate: '18 Oct',
    priority: 'Baja',
  },
];

const statusIcons = {
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  'in-progress': <Clock className="h-4 w-4 text-yellow-500" />,
  pending: <AlertCircle className="h-4 w-4 text-gray-400" />,
};

const priorityColors = {
  Alta: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  Media: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Baja: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

const Tasks = () => {
  return (
    <Section id="tasks" variant="secondary" spacing="lg">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Gestión de Tareas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organiza y haz seguimiento de tus tareas pendientes de manera eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      {statusIcons[task.status as keyof typeof statusIcons]}
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                      {task.priority}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Tasks;
