'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Asset } from '@prisma/client';
import { EditAssetSchema } from '@/lib/validationSchemas';
import { editAsset } from '@/lib/dbActions';

const onSubmit = async (data: Asset) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editAsset(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditAssetForm = ({ asset }: { asset: Asset }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Asset>({
    resolver: yupResolver(EditAssetSchema),
  });
  // console.log(asset);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Asset</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Asset Name</Form.Label>
                  <input
                    type="text"
                    {...register('assetName')}
                    className={`form-control ${errors.assetName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.assetName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Asset Amount</Form.Label>
                  <input
                    type="number"
                    {...register('assetAmount')}
                    className={`form-control ${errors.assetAmount ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.assetAmount?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Dollar Amount</Form.Label>
                  <input
                    type="number"
                    {...register('dollarAmount')}
                    className={`form-control ${errors.dollarAmount ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.dollarAmount?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAssetForm;
