'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addAsset } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AssetSchema } from '@/lib/validationSchemas';

// eslint-disable-next-line max-len
const onSubmit = async (asset: { assetName: string; assetAmount: number; dollarAmount: number; avgBuyPrice: number; pl: number }) => {
  // console.log(`onSubmit data: ${JSON.stringify(asset, null, 2)}`);
  await addAsset(asset);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddAssetForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddAssetForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AssetSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

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
                <Form.Group>
                  <Form.Label>Average Buy Price</Form.Label>
                  <input
                    type="number"
                    {...register('avgBuyPrice')}
                    className={`form-control ${errors.avgBuyPrice ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.avgBuyPrice?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Profit/Loss</Form.Label>
                  <input
                    type="number"
                    {...register('pl')}
                    className={`form-control ${errors.pl ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.pl?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
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

export default AddAssetForm;
